//package seb40_main_012.back.aop;
//
//import lombok.RequiredArgsConstructor;
//import org.aspectj.lang.JoinPoint;
//import org.aspectj.lang.annotation.After;
//import org.aspectj.lang.annotation.AfterReturning;
//import org.aspectj.lang.annotation.Aspect;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import seb40_main_012.back.book.entity.Genre;
//import seb40_main_012.back.email.EmailSenderService;
//import seb40_main_012.back.statistics.Statistics;
//import seb40_main_012.back.statistics.StatisticsRepository;
//import seb40_main_012.back.statistics.StatisticsService;
//import seb40_main_012.back.user.dto.UserDto;
//import seb40_main_012.back.user.entity.User;
//import seb40_main_012.back.user.entity.enums.GenderType;
//import seb40_main_012.back.user.service.UserService;
//
//import javax.servlet.annotation.WebListener;
//import javax.servlet.http.HttpSessionEvent;
//import javax.servlet.http.HttpSessionListener;
//import java.security.GeneralSecurityException;
//import java.time.LocalDate;
//import java.util.List;
//import java.util.stream.Collectors;
//
//
//@Aspect
//@Component
//@RequiredArgsConstructor
//public class CherriPickAop {
//
//    private final UserService userService;
//    private final EmailSenderService emailSenderService;
//    private final StatisticsService statisticsService;
//    private final StatisticsRepository statisticsRepository;
//
//    @AfterReturning(value = "execution(* seb40_main_012.back.user.controller.UserController.postUser(..)) && args(postDto))", returning = "response")
//    public void sendSignUpEmail(JoinPoint joinPoint, UserDto.PostDto postDto, ResponseEntity response) {
//
//        try {
//            emailSenderService.sendSignupEmail(postDto.getEmail());
//        } catch (GeneralSecurityException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @After(value = "execution(* seb40_main_012.back.book.BookController.carouselBooks())")
//    public void createTable(JoinPoint joinPoint) {
//
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); // 유저 인증 정보
//
//        if (statisticsRepository.findByDate(LocalDate.now()) == null && authentication.getName().equals("anonymousUser")) { // 오늘의 첫 방문자이면서 로그인 하지 않은 상태
//
//            statisticsService.createTable(LocalDate.now());
//            Statistics newStatistics = statisticsService.findByDate(LocalDate.now());
//            newStatistics.setTotalVisitor(1);
//            statisticsRepository.save(newStatistics);
//
//        } else if (statisticsRepository.findByDate(LocalDate.now()) == null && !authentication.getName().equals("anonymousUser")) { // 오늘의 첫 방문자이면서 로그인 한 경우
//
//            User findUser = userService.getLoginUser();
//            List<String> genre = userService.getAllGenre(findUser);
//            List<Genre> genres =findUser.getCategories().stream()
//                    .map(userCategory -> userCategory.getCategory().getGenre()
//                    ).collect(Collectors.toList());
//            statisticsService.createTable(LocalDate.now());
//            Statistics newStatistics = statisticsService.findByDate(LocalDate.now());
//            newStatistics.setTotalVisitor(1);
//
//            if (findUser.getGender() == GenderType.MALE) {
//
//                newStatistics.setMale(1);
//
//                if (genre.contains("NOVEL")) newStatistics.setNovel(1);
//                if (genre.contains("ESSAY")) newStatistics.setEssay(1);
//                if (genre.contains("POEM")) newStatistics.setPoem(1);
//                if (genre.contains("ART")) newStatistics.setArt(1);
//                if (genre.contains("HUMANITIES")) newStatistics.setHumanities(1);
//                if (genre.contains("SOCIAL")) newStatistics.setSocial(1);
//                if (genre.contains("NATURAL")) newStatistics.setScience(1);
//                if (genre.contains("COMICS")) newStatistics.setComics(1);
//                if (genre.contains("ETC")) newStatistics.setEtc(1);
//
//                switch (findUser.getAge()) {
//                    case TEENAGER:
//                        newStatistics.setTeenager(1);
//                    case TWENTIES:
//                        newStatistics.setTwenties(1);
//                    case THIRTIES:
//                        newStatistics.setThirties(1);
//                    case FORTIES:
//                        newStatistics.setForties(1);
//                    case FIFTIES:
//                        newStatistics.setFifties(1);
//                    case SIXTIES:
//                        newStatistics.setSixties(1);
//                    case SEVENTIES:
//                        newStatistics.setSeventies(1);
//                    case OTHERS:
//                        newStatistics.setOtherGender(1);
//                }
//            } else if (findUser.getGender() == GenderType.FEMALE) {
//
//                newStatistics.setFemale(1);
//
//                if (genre.contains("NOVEL")) newStatistics.setNovel(1);
//                if (genre.contains("ESSAY")) newStatistics.setEssay(1);
//                if (genre.contains("POEM")) newStatistics.setPoem(1);
//                if (genre.contains("ART")) newStatistics.setArt(1);
//                if (genre.contains("HUMANITIES")) newStatistics.setHumanities(1);
//                if (genre.contains("SOCIAL")) newStatistics.setSocial(1);
//                if (genre.contains("NATURAL")) newStatistics.setScience(1);
//                if (genre.contains("COMICS")) newStatistics.setComics(1);
//                if (genre.contains("ETC")) newStatistics.setEtc(1);
//
//                switch (findUser.getAge()) {
//                    case TEENAGER:
//                        newStatistics.setTeenager(1);
//                    case TWENTIES:
//                        newStatistics.setTwenties(1);
//                    case THIRTIES:
//                        newStatistics.setThirties(1);
//                    case FORTIES:
//                        newStatistics.setForties(1);
//                    case FIFTIES:
//                        newStatistics.setFifties(1);
//                    case SIXTIES:
//                        newStatistics.setSixties(1);
//                    case SEVENTIES:
//                        newStatistics.setSeventies(1);
//                    case OTHERS:
//                        newStatistics.setOtherGender(1);
//                }
//            } else if (findUser.getGender() == GenderType.MYSTIC) {
//
//                newStatistics.setOtherGender(1);
//
//                if (genre.contains("NOVEL")) newStatistics.setNovel(1);
//                if (genre.contains("ESSAY")) newStatistics.setEssay(1);
//                if (genre.contains("POEM")) newStatistics.setPoem(1);
//                if (genre.contains("ART")) newStatistics.setArt(1);
//                if (genre.contains("HUMANITIES")) newStatistics.setHumanities(1);
//                if (genre.contains("SOCIAL")) newStatistics.setSocial(1);
//                if (genre.contains("NATURAL")) newStatistics.setScience(1);
//                if (genre.contains("COMICS")) newStatistics.setComics(1);
//                if (genre.contains("ETC")) newStatistics.setEtc(1);
//
//                switch (findUser.getAge()) {
//                    case TEENAGER:
//                        newStatistics.setTeenager(1);
//                    case TWENTIES:
//                        newStatistics.setTwenties(1);
//                    case THIRTIES:
//                        newStatistics.setThirties(1);
//                    case FORTIES:
//                        newStatistics.setForties(1);
//                    case FIFTIES:
//                        newStatistics.setFifties(1);
//                    case SIXTIES:
//                        newStatistics.setSixties(1);
//                    case SEVENTIES:
//                        newStatistics.setSeventies(1);
//                    case OTHERS:
//                        newStatistics.setOtherGender(1);
//                }
//            } else if (findUser.getGender() == GenderType.NOBODY) {
//
//                newStatistics.setNobody(1);
//
//                if (genre.contains("NOVEL")) newStatistics.setNovel(1);
//                if (genre.contains("ESSAY")) newStatistics.setEssay(1);
//                if (genre.contains("POEM")) newStatistics.setPoem(1);
//                if (genre.contains("ART")) newStatistics.setArt(1);
//                if (genre.contains("HUMANITIES")) newStatistics.setHumanities(1);
//                if (genre.contains("SOCIAL")) newStatistics.setSocial(1);
//                if (genre.contains("NATURAL")) newStatistics.setScience(1);
//                if (genre.contains("COMICS")) newStatistics.setComics(1);
//                if (genre.contains("ETC")) newStatistics.setEtc(1);
//
//                switch (findUser.getAge()) {
//                    case TEENAGER:
//                        newStatistics.setTeenager(1);
//                    case TWENTIES:
//                        newStatistics.setTwenties(1);
//                    case THIRTIES:
//                        newStatistics.setThirties(1);
//                    case FORTIES:
//                        newStatistics.setForties(1);
//                    case FIFTIES:
//                        newStatistics.setFifties(1);
//                    case SIXTIES:
//                        newStatistics.setSixties(1);
//                    case SEVENTIES:
//                        newStatistics.setSeventies(1);
//                    case OTHERS:
//                        newStatistics.setOtherGender(1);
//                }
//            }
//            statisticsRepository.save(newStatistics);
//        } else {
//            Statistics statistics = statisticsService.findByDate(LocalDate.now());
//            statistics.setTotalVisitor(statistics.getTotalVisitor() + 1);
//            statisticsRepository.save(statistics);
//        }
//    }
//
//    @WebListener
//    public static class sessionStatistics implements HttpSessionListener {
//
//
//        @Override
//        public void sessionCreated(HttpSessionEvent httpSessionEvent) {
//        }
//
//        @Override
//        public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
//
//        }
//
//    }
//
//    @AfterReturning(value = "execution(* seb40_main_012.back.config.auth.service.UserDetailsServiceImpl.loadUserByUsername(..))", returning = "findUser")
//    public void signInStatistics(JoinPoint joinPoint, User findUser) {
//
//        if (statisticsRepository.findByDate(LocalDate.now()) == null) {
//            statisticsService.createTable(LocalDate.now());
//        }
//    }
//
//
//}
