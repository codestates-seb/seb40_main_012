package seb40_main_012.back.aop;

import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.ServletWebRequest;
import seb40_main_012.back.config.auth.cookie.CookieManager;
import seb40_main_012.back.config.auth.repository.RefreshTokenRepository;
import seb40_main_012.back.email.EmailSenderService;
import seb40_main_012.back.statistics.*;
import seb40_main_012.back.user.dto.UserDto;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.entity.enums.GenderType;
import seb40_main_012.back.user.repository.UserRepository;
import seb40_main_012.back.user.service.UserService;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.*;
import java.security.GeneralSecurityException;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.LongStream;


@Aspect
@Component
@RequiredArgsConstructor
public class CherriPickAop {

    private final UserService userService;
    private final UserRepository userRepository;
    private final EmailSenderService emailSenderService;
    private final StatisticsService statisticsService;
    private final StatisticsRepository statisticsRepository;
    private final StayTimeService stayTimeService;
    private final StayTimeRepository stayTimeRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    private final CookieManager cookieManager;

    @AfterReturning(value = "execution(* seb40_main_012.back.user.controller.UserController.postUser(..)) && args(postDto))", returning = "response")
    public void sendSignUpEmail(JoinPoint joinPoint, UserDto.PostDto postDto, ResponseEntity response) { // 회원가입 이메일

        try {
            emailSenderService.sendSignupEmail(postDto.getEmail());
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }
    }

    @Before(value = "execution(* seb40_main_012.back.book.BookController.carouselBooks())") // 메인화면 접근시
    public void createTable(JoinPoint joinPoint) { // 오늘의 첫 방문자가 있을 시 테이블 생성 및 정보 입력

        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();

        HttpServletRequest req = attr.getRequest(); // Http Request
        HttpServletResponse res = attr.getResponse(); // Http Response
        Cookie[] cookies = req.getCookies(); // Request Cookies
        String token = req.getHeader("Cookie"); // Cookie에서 뜯어온 토큰들
        String userEmail = null; // 토큰으로 검색한 유저 이메일

        if (cookies != null) {
            List<String> refreshToken = Arrays.stream(token.split("refreshToken=")) // Refresh Token 골라내기
                    .filter(a -> a.startsWith("ey"))
                    .collect(Collectors.toList());
            if (refreshToken.size() != 0) {
                userEmail = refreshTokenRepository.findUserEmailByToken(refreshToken.get(refreshToken.size() - 1));

                System.out.println("-----------------------------------------");
                Arrays.stream(cookies).map(Cookie::getValue).forEach(System.out::println);
                System.out.println(userEmail);
                System.out.println("-----------------------------------------");

            }
        }

//        ResponseCookie statCookie = cookieManager.statCookie("visit_cookie", "statistic" + "_" + "[" + LocalDateTime.now() + "]");
//        res.setHeader("Set-Cookie", statCookie.toString());

        if (cookies != null) { // 쿠키를 가진 경우
            for (Cookie cookie : cookies) {
                if (cookie.getValue().contains("statistic") && !cookie.getValue().contains(req.getHeader("Origin"))) { // 통계 쿠키가 있지만 방문한 적 없을 경우

                    ResponseCookie newStatCookie = cookieManager.statCookie("visit_cookie", "statistic" + "_" + "[" + LocalDateTime.now() + "]" + "_" +"[" + req.getHeader("Origin") + "]");

                    cookie.setMaxAge(0);

                    res.setHeader("Set-Cookie", newStatCookie.toString());
//                    res.addCookie(cookie);
                } else if (!cookie.getValue().contains("statistic")) { // 통계 쿠키가 없는 경우

                    ResponseCookie statCookie = cookieManager.statCookie("visit_cookie", "statistic" + "_" + "[" + LocalDateTime.now() + "]" + "_" +"[" + req.getHeader("Origin") + "]");
                    res.setHeader("Set-Cookie", statCookie.toString());
                }
            }
        } else { // 쿠키가 없는 경우

        }

        // 유저 인증 정보
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (statisticsRepository.findByDate(LocalDate.now()) == null && authentication.getName().equals("anonymousUser")) { // 오늘의 첫 방문자이면서 로그인 하지 않은 상태

            statisticsService.createTable(LocalDate.now());
            Statistics newStatistics = statisticsService.findByDate(LocalDate.now());
            newStatistics.setTotalVisitor(1);
            statisticsRepository.save(newStatistics);

        } else if (statisticsRepository.findByDate(LocalDate.now()) == null && !authentication.getName().equals("anonymousUser")) { // 오늘의 첫 방문자이면서 로그인 되어 있는 경우

            User findUser = userService.getLoginUser();
            List<String> genre = userService.getAllGenre(findUser);
            statisticsService.createTable(LocalDate.now());
            stayTimeService.createStayTimeTable(); // 체류시간 테이블 생성
            Statistics newStatistics = statisticsService.findByDate(LocalDate.now());
            newStatistics.setTotalVisitor(1);

            firstVisitWithAuth(findUser, genre, newStatistics);

            statisticsRepository.save(newStatistics);

        } else if (statisticsRepository.findByDate(LocalDate.now()) != null && authentication.getName().equals("anonymousUser")) { // 첫 방문자가 아니면서 로그인 하지 않은 상태

            Statistics statistics = statisticsService.findByDate(LocalDate.now());
            statistics.setTotalVisitor(statistics.getTotalVisitor() + 1);
            statisticsRepository.save(statistics);

        } else if (statisticsRepository.findByDate(LocalDate.now()) != null && !authentication.getName().equals("anonymousUser")) { // 첫 방문자가 아니면서 로그인 한 상태

            User findUser = userService.getLoginUser();
            List<String> genre = userService.getAllGenre(findUser);
            Statistics statistics = statisticsService.findByDate(LocalDate.now());

//            calcTotalVisitorWithCookies(cookies, req, res, statistics); // 쿠키 확인 후 방문자 증가

            notFirstVisitWithAuth(findUser, genre, statistics);

            statisticsRepository.save(statistics);

        }
    }

    @AfterReturning(value = "execution(* seb40_main_012.back.config.auth.jwt.JwtTokenizer.delegateRefreshToken(..)) && args(user)", returning = "refreshToken")
    public void signInStatistics(JoinPoint joinPoint, User user, String refreshToken) { // 로그인 하는 경우

        HttpServletRequest req = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String ip = req.getRemoteAddr();

        StayTime newSignIn = StayTime.builder()
                .signIn(LocalDateTime.now())
                .user(user)
                .refreshToken(refreshToken)
                .build();

        stayTimeRepository.save(newSignIn);
    }


    @Before(value = "execution(* seb40_main_012.back.config.auth.jwt.JwtTokenizer.removeRefreshToken(..)) && args(tokenValue)")
    public void signOutStatistics(JoinPoint joinPoint, String tokenValue) { // 로그아웃 하려는 경우

        String userEmail = refreshTokenRepository.findUserEmailByToken(tokenValue); // 유저 이메일

        User user = userService.findUserByEmail(userEmail); // 로그아웃 하는 유저

        StayTime findStayTime = stayTimeRepository.findByToken(tokenValue); // 토큰으로 StayTime 객체 불러오기
        findStayTime.setSignOut(LocalDateTime.now());
        findStayTime.setSignOutDay(LocalDate.now()); // 로그아웃 한 날짜 추가(쿼리용)

        long duration = 0;

        if (findStayTime.getSignIn() == null) {
            duration = 3600;
        } else {
            duration = Duration.between(findStayTime.getSignIn(), findStayTime.getSignOut()).getSeconds(); // 로그인 - 로그아웃 간격(초)
        }
        String durationStr = duration / 60 + "분 " + duration % 60 + "초"; // 보기 좋게 분-초로 계산

        findStayTime.setStayTime(duration);
        findStayTime.setStayTimeStr(durationStr);

        stayTimeRepository.save(findStayTime); // DB에 바로 반영

        if (statisticsRepository.findByDate(LocalDate.now()) == null && findStayTime.getSignIn().getDayOfMonth() != LocalDateTime.now().getDayOfMonth()) { // 전날 로그인 해서 오늘의 첫 로그아웃일 경우

            Statistics newStatistics = Statistics.builder() // Statistics 객체 새로 생성
                    .date(LocalDate.now())
                    .averageStayTimeSec(duration)
                    .averageStayTimeStr(durationStr)
                    .build();

            statisticsRepository.save(newStatistics);

            stayTimeRepository.deleteByLocalDate(LocalDate.now().minusDays(1)); // 하루 전 로그아웃 자료 날리기
            stayTimeRepository.deleteByLocalDate(LocalDate.now().minusDays(2)); // 이틀 전 로그아웃 자료 날리기

        } else if (statisticsRepository.findByDate(LocalDate.now()) != null && findStayTime.getSignIn().getDayOfMonth() == LocalDateTime.now().getDayOfMonth()) { // 오늘 로그인 해서 첫 로그아웃 이벤트를 생성했을 경우

            Statistics statistics = statisticsService.findByDate(LocalDate.now()); // 오늘의 통계 객체

            long signOutNumToday = stayTimeRepository.findByLocalDate(LocalDate.now()).size(); // 오늘 로그아웃 한 총 사용자(본인 포함)

            if (signOutNumToday == 1) {

                statistics.setAverageStayTimeSec(duration);
                statistics.setAverageStayTimeStr(durationStr);

                statisticsRepository.save(statistics);

            } else {

                // 새롭게 계산된 평균 체류시간(초)
                long averageStayTime = (long) stayTimeRepository.findByLocalDate(LocalDate.now()).stream()
                        .map(StayTime::getStayTime)
                        .flatMapToLong(LongStream::of)
                        .average()
                        .getAsDouble();

                // 새롭게 계산된 평균 체류시간(분-초)
                String averageStayTimeStr = averageStayTime / 60 + "분 " + averageStayTime % 60 + "초";

                statistics.setAverageStayTimeSec(averageStayTime);
                statistics.setAverageStayTimeStr(averageStayTimeStr);

                statisticsRepository.save(statistics);
            }
        }
    }

    public void calcTotalVisitorWithCookies(Cookie[] cookies, HttpServletRequest req, HttpServletResponse res, Statistics statistics) {

//        if (cookies != null) { // 쿠키를 가진 경우
//            for (Cookie cookie : cookies) {
//                if (!cookie.getValue().contains(req.getHeader("Origin"))) {
//                    cookie.setValue(cookie.getValue() + "_" + "[" + req.getHeader("Origin") + "]");
//                    cookie.setMaxAge(60 * 60 * 2);
//                    res.addCookie(cookie);
//                    statistics.setTotalVisitor(statistics.getTotalVisitor() + 3);
//                }
//            }
//        } else { // 쿠키가 없는 경우
//
//            Cookie visitCookie = new Cookie("visit_Cookie", req.getHeader("Origin")); // 헤더를 가진 새로운 쿠키 생성
//            visitCookie.setMaxAge(60 * 60 * 2);
//            res.addCookie(visitCookie);
//            statistics.setTotalVisitor(statistics.getTotalVisitor() + 3);
//        }
    }
//    @Before(value = "execution(* seb40_main_012.back.config.auth.jwt.JwtTokenizer.removeRefreshToken(..)) && args(tokenValue)")
//    public void signOutStatistics(JoinPoint joinPoint, String tokenValue) { // 로그아웃 한 경우
//
//        String userEmail = refreshTokenRepository.findUserEmailByToken(tokenValue); // 유저 이메일
//        User user = userService.findUserByEmail(userEmail); // 로그아웃 하는 유저
//
//        StayTime findStayTime = stayTimeRepository.findByToken(tokenValue); // 토큰으로 StayTime 객체 불러오기
//        findStayTime.setSignOut(LocalDateTime.now());
//        findStayTime.setSignOutDay(LocalDate.now()); // 로그아웃 한 날짜 추가(쿼리용)
//
//        long duration = 0;
//
//
//        if (findStayTime.getSignIn() == null) {
//            duration = 3600;
//        } else {
//            duration = Duration.between(findStayTime.getSignIn(), findStayTime.getSignOut()).getSeconds(); // 로그인 - 로그아웃 간격(초)
//        }
//        String durationForStat = duration / 60 + "분 " + duration % 60 + "초"; // 보기 좋게 분-초로 계산
//
//        findStayTime.setStayTime(duration);
//        findStayTime.setStayTimeStr(durationForStat);
//
//        stayTimeRepository.save(findStayTime); // DB에 바로 반영
//
//        if (statisticsRepository.findByDate(LocalDate.now()) == null && findStayTime.getSignIn().getDayOfMonth() != LocalDateTime.now().getDayOfMonth()) { // 전날 로그인 해서 오늘의 첫 로그아웃일 경우
//
//            Statistics newStatistics = Statistics.builder() // Statistics 객체 새로 생성
//                    .date(LocalDate.now())
//                    .averageStayTimeSec(duration)
//                    .averageStayTimeStr(durationForStat)
//                    .build();
//
//            statisticsRepository.save(newStatistics);
//
//            stayTimeRepository.deleteByLocalDate(LocalDate.now().minusDays(1)); // 하루 전 로그아웃 자료 날리기
//            stayTimeRepository.deleteByLocalDate(LocalDate.now().minusDays(2)); // 이틀 전 로그아웃 자료 날리기
//
//        } else if (statisticsRepository.findByDate(LocalDate.now()) != null) { // 오늘 첫 로그아웃이 아닐 경우
//
//            Statistics statistics = statisticsRepository.findByDate(LocalDate.now()); // 오늘의 통계 객체 불러오기
//
//            long signOutNumToday = stayTimeRepository.findByLocalDate(LocalDate.now()).size(); // 오늘 로그아웃 한 총 사용자(본인 제외)
//
//            // 새롭게 계산된 평균 체류시간(초)
//            long averageStayTime = stayTimeRepository.findByLocalDate(LocalDate.now()).stream()
//                    .map(StayTime::getStayTime)
//                    .flatMapToLong(LongStream::of)
//                    .sum() / (signOutNumToday + 1);
//
//            // 새롭게 계산된 평균 체류시간(분-초)
//            String averageStayTimeStr = averageStayTime / 60 + "분 " + averageStayTime % 60 + "초";
//
//            statistics.setAverageStayTimeSec(averageStayTime);
//            statistics.setAverageStayTimeStr(averageStayTimeStr);
//
//            statisticsRepository.save(statistics);
//        }
//    }


    public void firstVisitWithAuth(User findUser, List<String> genre, Statistics newStatistics) {

        if (findUser.getGender() == GenderType.MALE) {

            newStatistics.setMale(1);

            if (genre.contains("NOVEL")) newStatistics.setNovel(1);
            if (genre.contains("ESSAY")) newStatistics.setEssay(1);
            if (genre.contains("POEM")) newStatistics.setPoem(1);
            if (genre.contains("ART")) newStatistics.setArt(1);
            if (genre.contains("HUMANITIES")) newStatistics.setHumanities(1);
            if (genre.contains("SOCIAL")) newStatistics.setSocial(1);
            if (genre.contains("NATURAL")) newStatistics.setScience(1);
            if (genre.contains("COMICS")) newStatistics.setComics(1);
            if (genre.contains("ETC")) newStatistics.setEtc(1);

            switch (findUser.getAge()) {
                case TEENAGER:
                    newStatistics.setTeenager(1);
                case TWENTIES:
                    newStatistics.setTwenties(1);
                case THIRTIES:
                    newStatistics.setThirties(1);
                case FORTIES:
                    newStatistics.setForties(1);
                case FIFTIES:
                    newStatistics.setFifties(1);
                case SIXTIES:
                    newStatistics.setSixties(1);
                case SEVENTIES:
                    newStatistics.setSeventies(1);
                case OTHERS:
                    newStatistics.setOtherGender(1);
            }

        } else if (findUser.getGender() == GenderType.FEMALE) {

            newStatistics.setFemale(1);

            if (genre.contains("NOVEL")) newStatistics.setNovel(1);
            if (genre.contains("ESSAY")) newStatistics.setEssay(1);
            if (genre.contains("POEM")) newStatistics.setPoem(1);
            if (genre.contains("ART")) newStatistics.setArt(1);
            if (genre.contains("HUMANITIES")) newStatistics.setHumanities(1);
            if (genre.contains("SOCIAL")) newStatistics.setSocial(1);
            if (genre.contains("NATURAL")) newStatistics.setScience(1);
            if (genre.contains("COMICS")) newStatistics.setComics(1);
            if (genre.contains("ETC")) newStatistics.setEtc(1);

            switch (findUser.getAge()) {
                case TEENAGER:
                    newStatistics.setTeenager(1);
                    break;
                case TWENTIES:
                    newStatistics.setTwenties(1);
                    break;
                case THIRTIES:
                    newStatistics.setThirties(1);
                    break;
                case FORTIES:
                    newStatistics.setForties(1);
                    break;
                case FIFTIES:
                    newStatistics.setFifties(1);
                    break;
                case SIXTIES:
                    newStatistics.setSixties(1);
                    break;
                case SEVENTIES:
                    newStatistics.setSeventies(1);
                    break;
                case OTHERS:
                    newStatistics.setOtherGender(1);
                    break;
            }

        } else if (findUser.getGender() == GenderType.MYSTIC) {

            newStatistics.setOtherGender(1);

            if (genre.contains("NOVEL")) newStatistics.setNovel(1);
            if (genre.contains("ESSAY")) newStatistics.setEssay(1);
            if (genre.contains("POEM")) newStatistics.setPoem(1);
            if (genre.contains("ART")) newStatistics.setArt(1);
            if (genre.contains("HUMANITIES")) newStatistics.setHumanities(1);
            if (genre.contains("SOCIAL")) newStatistics.setSocial(1);
            if (genre.contains("NATURAL")) newStatistics.setScience(1);
            if (genre.contains("COMICS")) newStatistics.setComics(1);
            if (genre.contains("ETC")) newStatistics.setEtc(1);

            switch (findUser.getAge()) {
                case TEENAGER:
                    newStatistics.setTeenager(1);
                    break;
                case TWENTIES:
                    newStatistics.setTwenties(1);
                    break;
                case THIRTIES:
                    newStatistics.setThirties(1);
                    break;
                case FORTIES:
                    newStatistics.setForties(1);
                    break;
                case FIFTIES:
                    newStatistics.setFifties(1);
                    break;
                case SIXTIES:
                    newStatistics.setSixties(1);
                    break;
                case SEVENTIES:
                    newStatistics.setSeventies(1);
                    break;
                case OTHERS:
                    newStatistics.setOtherGender(1);
                    break;
            }

        } else if (findUser.getGender() == GenderType.NOBODY) {

            newStatistics.setNobody(1);

            if (genre.contains("NOVEL")) newStatistics.setNovel(1);
            if (genre.contains("ESSAY")) newStatistics.setEssay(1);
            if (genre.contains("POEM")) newStatistics.setPoem(1);
            if (genre.contains("ART")) newStatistics.setArt(1);
            if (genre.contains("HUMANITIES")) newStatistics.setHumanities(1);
            if (genre.contains("SOCIAL")) newStatistics.setSocial(1);
            if (genre.contains("NATURAL")) newStatistics.setScience(1);
            if (genre.contains("COMICS")) newStatistics.setComics(1);
            if (genre.contains("ETC")) newStatistics.setEtc(1);

            switch (findUser.getAge()) {
                case TEENAGER:
                    newStatistics.setTeenager(1);
                    break;
                case TWENTIES:
                    newStatistics.setTwenties(1);
                    break;
                case THIRTIES:
                    newStatistics.setThirties(1);
                    break;
                case FORTIES:
                    newStatistics.setForties(1);
                    break;
                case FIFTIES:
                    newStatistics.setFifties(1);
                    break;
                case SIXTIES:
                    newStatistics.setSixties(1);
                    break;
                case SEVENTIES:
                    newStatistics.setSeventies(1);
                    break;
                case OTHERS:
                    newStatistics.setOtherGender(1);
                    break;
            }
        }
    }

    public void notFirstVisitWithAuth(User findUser, List<String> genre, Statistics newStatistics) {

        if (findUser.getGender() == GenderType.MALE) {

            newStatistics.setMale(newStatistics.getMale() + 1);

            if (genre.contains("NOVEL")) newStatistics.setNovel(newStatistics.getNovel() + 1);
            if (genre.contains("ESSAY")) newStatistics.setEssay(newStatistics.getEssay() + 1);
            if (genre.contains("POEM")) newStatistics.setPoem(newStatistics.getPoem() + 1);
            if (genre.contains("ART")) newStatistics.setArt(newStatistics.getArt() + 1);
            if (genre.contains("HUMANITIES")) newStatistics.setHumanities(newStatistics.getHumanities() + 1);
            if (genre.contains("SOCIAL")) newStatistics.setSocial(newStatistics.getSocial() + 1);
            if (genre.contains("NATURAL")) newStatistics.setScience(newStatistics.getScience() + 1);
            if (genre.contains("COMICS")) newStatistics.setComics(newStatistics.getComics() + 1);
            if (genre.contains("ETC")) newStatistics.setEtc(newStatistics.getEtc() + 1);

            switch (findUser.getAge()) {
                case TEENAGER:
                    newStatistics.setTeenager(newStatistics.getTeenager() + 1);
                    break;
                case TWENTIES:
                    newStatistics.setTwenties(newStatistics.getTwenties() + 1);
                    break;
                case THIRTIES:
                    newStatistics.setThirties(newStatistics.getThirties() + 1);
                    break;
                case FORTIES:
                    newStatistics.setForties(newStatistics.getForties() + 1);
                    break;
                case FIFTIES:
                    newStatistics.setFifties(newStatistics.getFifties() + 1);
                    break;
                case SIXTIES:
                    newStatistics.setSixties(newStatistics.getSixties() + 1);
                    break;
                case SEVENTIES:
                    newStatistics.setSeventies(newStatistics.getSeventies() + 1);
                    break;
                case OTHERS:
                    newStatistics.setOtherGender(newStatistics.getOtherGender() + 1);
                    break;
            }
        } else if (findUser.getGender() == GenderType.FEMALE) {

            newStatistics.setFemale(newStatistics.getFemale() + 1);

            if (genre.contains("NOVEL")) newStatistics.setNovel(newStatistics.getNovel() + 1);
            if (genre.contains("ESSAY")) newStatistics.setEssay(newStatistics.getEssay() + 1);
            if (genre.contains("POEM")) newStatistics.setPoem(newStatistics.getPoem() + 1);
            if (genre.contains("ART")) newStatistics.setArt(newStatistics.getArt() + 1);
            if (genre.contains("HUMANITIES")) newStatistics.setHumanities(newStatistics.getHumanities() + 1);
            if (genre.contains("SOCIAL")) newStatistics.setSocial(newStatistics.getSocial() + 1);
            if (genre.contains("NATURAL")) newStatistics.setScience(newStatistics.getScience() + 1);
            if (genre.contains("COMICS")) newStatistics.setComics(newStatistics.getComics() + 1);
            if (genre.contains("ETC")) newStatistics.setEtc(newStatistics.getEtc() + 1);

            switch (findUser.getAge()) {
                case TEENAGER:
                    newStatistics.setTeenager(newStatistics.getTeenager() + 1);
                    break;
                case TWENTIES:
                    newStatistics.setTwenties(newStatistics.getTwenties() + 1);
                    break;
                case THIRTIES:
                    newStatistics.setThirties(newStatistics.getThirties() + 1);
                    break;
                case FORTIES:
                    newStatistics.setForties(newStatistics.getForties() + 1);
                    break;
                case FIFTIES:
                    newStatistics.setFifties(newStatistics.getFifties() + 1);
                    break;
                case SIXTIES:
                    newStatistics.setSixties(newStatistics.getSixties() + 1);
                    break;
                case SEVENTIES:
                    newStatistics.setSeventies(newStatistics.getSeventies() + 1);
                    break;
                case OTHERS:
                    newStatistics.setOtherGender(newStatistics.getOtherGender() + 1);
                    break;
            }
        } else if (findUser.getGender() == GenderType.MYSTIC) {

            newStatistics.setOtherGender(newStatistics.getOtherGender() + 1);

            if (genre.contains("NOVEL")) newStatistics.setNovel(newStatistics.getNovel() + 1);
            if (genre.contains("ESSAY")) newStatistics.setEssay(newStatistics.getEssay() + 1);
            if (genre.contains("POEM")) newStatistics.setPoem(newStatistics.getPoem() + 1);
            if (genre.contains("ART")) newStatistics.setArt(newStatistics.getArt() + 1);
            if (genre.contains("HUMANITIES")) newStatistics.setHumanities(newStatistics.getHumanities() + 1);
            if (genre.contains("SOCIAL")) newStatistics.setSocial(newStatistics.getSocial() + 1);
            if (genre.contains("NATURAL")) newStatistics.setScience(newStatistics.getScience() + 1);
            if (genre.contains("COMICS")) newStatistics.setComics(newStatistics.getComics() + 1);
            if (genre.contains("ETC")) newStatistics.setEtc(newStatistics.getEtc() + 1);

            switch (findUser.getAge()) {
                case TEENAGER:
                    newStatistics.setTeenager(newStatistics.getTeenager() + 1);
                    break;
                case TWENTIES:
                    newStatistics.setTwenties(newStatistics.getTwenties() + 1);
                    break;
                case THIRTIES:
                    newStatistics.setThirties(newStatistics.getThirties() + 1);
                    break;
                case FORTIES:
                    newStatistics.setForties(newStatistics.getForties() + 1);
                    break;
                case FIFTIES:
                    newStatistics.setFifties(newStatistics.getFifties() + 1);
                    break;
                case SIXTIES:
                    newStatistics.setSixties(newStatistics.getSixties() + 1);
                    break;
                case SEVENTIES:
                    newStatistics.setSeventies(newStatistics.getSeventies() + 1);
                    break;
                case OTHERS:
                    newStatistics.setOtherGender(newStatistics.getOtherGender() + 1);
                    break;
            }
        } else if (findUser.getGender() == GenderType.NOBODY) {

            newStatistics.setNobody(newStatistics.getNobody() + 1);

            if (genre.contains("NOVEL")) newStatistics.setNovel(newStatistics.getNovel() + 1);
            if (genre.contains("ESSAY")) newStatistics.setEssay(newStatistics.getEssay() + 1);
            if (genre.contains("POEM")) newStatistics.setPoem(newStatistics.getPoem() + 1);
            if (genre.contains("ART")) newStatistics.setArt(newStatistics.getArt() + 1);
            if (genre.contains("HUMANITIES")) newStatistics.setHumanities(newStatistics.getHumanities() + 1);
            if (genre.contains("SOCIAL")) newStatistics.setSocial(newStatistics.getSocial() + 1);
            if (genre.contains("NATURAL")) newStatistics.setScience(newStatistics.getScience() + 1);
            if (genre.contains("COMICS")) newStatistics.setComics(newStatistics.getComics() + 1);
            if (genre.contains("ETC")) newStatistics.setEtc(newStatistics.getEtc() + 1);

            switch (findUser.getAge()) {
                case TEENAGER:
                    newStatistics.setTeenager(newStatistics.getTeenager() + 1);
                    break;
                case TWENTIES:
                    newStatistics.setTwenties(newStatistics.getTwenties() + 1);
                    break;
                case THIRTIES:
                    newStatistics.setThirties(newStatistics.getThirties() + 1);
                    break;
                case FORTIES:
                    newStatistics.setForties(newStatistics.getForties() + 1);
                    break;
                case FIFTIES:
                    newStatistics.setFifties(newStatistics.getFifties() + 1);
                    break;
                case SIXTIES:
                    newStatistics.setSixties(newStatistics.getSixties() + 1);
                    break;
                case SEVENTIES:
                    newStatistics.setSeventies(newStatistics.getSeventies() + 1);
                    break;
                case OTHERS:
                    newStatistics.setOtherGender(newStatistics.getOtherGender() + 1);
                    break;
            }
        }
    }

    @WebListener
    public static class sessionStatistics implements HttpSessionListener { // 세션 사용하게 되면 쓰기

        @Override
        public void sessionCreated(HttpSessionEvent httpSessionEvent) {
        }

        @Override
        public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
        }
    }

    @AfterReturning(value = "execution(* seb40_main_012.back.user.controller.UserController.emailConfirm(..)) && args(emailDto))", returning = "response")
    public void sendConfirmEmail(JoinPoint joinPoint, UserDto.EmailDto emailDto, String response) { // 이메일 인증

        try {
            emailSenderService.sendAuthCode(emailDto.getEmail(), response);
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }
    }

}

