package seb40_main_012.back.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.book.entity.Genre;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.common.mypage.MyPageRepositorySupport;
import seb40_main_012.back.common.bookmark.Bookmark;
import seb40_main_012.back.common.bookmark.BookmarkRepository;
import seb40_main_012.back.bookCollection.repository.BookCollectionRepository;
import seb40_main_012.back.common.comment.CommentRepository;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.comment.entity.CommentType;
import seb40_main_012.back.config.auth.dto.LoginDto;
import seb40_main_012.back.config.auth.utils.CustomAuthorityUtils;
import seb40_main_012.back.email.EmailSenderService;
import seb40_main_012.back.pairing.PairingRepository;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.Category;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.entity.UserCategory;
import seb40_main_012.back.user.repository.CategoryRepository;
import seb40_main_012.back.user.repository.UserCategoryRepository;
import seb40_main_012.back.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final EmailSenderService emailSenderService;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final CommentRepository commentRepository;
    private final PairingRepository pairingRepository;
    private final BookCollectionRepository collectionRepository;
    private final BookmarkRepository bookmarkRepository;
    private final MyPageRepositorySupport myPageRepositorySupport;
    private final ApplicationEventPublisher publisher;
    private final CustomAuthorityUtils authorityUtils;

    private final BCryptPasswordEncoder passwordEncoder;

    public User createUser(User user) {
        verifyEmail(user.getEmail());
        verifyNickName(user.getNickName());
//
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);
        user.setBookTemp(36.5);
        user.setFirstLogin(true);
        //user.setProviderType(ProviderType.LOCAL);
        User savedUser = userRepository.save(user);

//        UserRegistrationApplicationEvent signupEvent = new UserRegistrationApplicationEvent(this, savedUser);
//        publisher.publishEvent(signupEvent);
        return savedUser;
    }

    public boolean verifyNickName(String nickName) {
        if (userRepository.findByNickName(nickName) == null)
            return true;
        else {
            throw new BusinessLogicException(ExceptionCode.NICKNAME_EXISTS);
        }
    }

    public void updateNickName(String nickName) {
        User findUser = getLoginUser();
//        if(nickName!=findUser.getNickName()) {verifyNickName(nickName);}
        findUser.updateNickName(nickName);
        userRepository.save(findUser);
    }

    public boolean verifyPassword(String password) {
        User findUser = getLoginUser();
        return findUser.verifyPassword(passwordEncoder, password);
    }

    public void updatePassword(String password) {
        User findUser = getLoginUser();
        if (verifyPassword(password)) {
            throw new BusinessLogicException(ExceptionCode.PASSWORD_CANNOT_CHANGE);
        } else {
            findUser.updatePassword(passwordEncoder, password);
//            userRepository.save(findUser);
        }
    }

    /**
     * 리팩토링 필요
     */
    public User editUserInfo(User user, List<Genre> categoryValue) {
        User findUser = getLoginUser();
        userCategoryRepository.deleteAllByUser(findUser);

        //카테고리에 있는 값이면 > 유저 카테고리에 해당 카테고리가 저장돼있는지 확인 후 > 있으면 쓰루, 없으면 유저카테고리에 카테고리 저장
        //카테고리에 없는 값이면 에러
        categoryValue.forEach(
                value -> {
                    Category category = categoryRepository.findByGenre(value);

                    if (categoryRepository.findByGenre(value) != null) {
                        UserCategory userCategory = new UserCategory(category, findUser);
                        userCategoryRepository.save(userCategory);
                        findUser.addUserCategory(userCategory);
                        userRepository.save(findUser);
                    }
                }
        );
        findUser.updateUserInfo(user);
        return findUser;
    }

    public boolean deleteUser() {
        User findUser = getLoginUser();
        userRepository.deleteById(findUser.getUserId());
        return true;
    }

    public List<Comment> getUserComment() {
        User findUser = getLoginUser();
        List<Comment> comments = findUser.getComments();
        comments.forEach(
                x -> {
                    if (x.getCommentType() == CommentType.BOOK) {

                    } else if (x.getCommentType() == CommentType.PAIRING) ;
                    else if (x.getCommentType() == CommentType.BOOK_COLLECTION) ;
                }
        );
        return comments;
    }

    public Slice<Pairing> getUserPairing(Long lastStoreId) {
        User findUser = getLoginUser();
        PageRequest pageRequest = PageRequest.of(0, 5);
        return myPageRepositorySupport.findUserPairing(pageRequest, lastStoreId, findUser.getUserId());
    }


    public Slice<BookCollection> getUserCollection(Long lastStoreId) {
        User findUser = getLoginUser();
        PageRequest pageRequest = PageRequest.of(0, 5);
        return myPageRepositorySupport.findUserCollection(pageRequest, lastStoreId, findUser.getUserId());
    }


    public User findUser() {
        User findUser = getLoginUser();
        findUser.setBookTemp(calcBookTemp()); // 유저 테이블에 컬렉션 & 좋아요 추가된 후에 주석 풀기

        return findUser;
    }

    public User findVerifiedUser(Long id) {
        User findUser = userRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
        return findUser;
    }

//    public List<BookCollection> getBookmarkByBookCollection() {
//        User findUser = getLoginUser();
//        PageRequest pageRequest = PageRequest.of(0,5)
//        List<Bookmark> allBookmarks = bookmarkRepository.findByUser(findUser);
//        List<Bookmark> bookmarks = new ArrayList<>();
//        allBookmarks.forEach(
//                x -> {
//                    if (x.getBookCollection()!=null) bookmarks.add(x);
//                }
//        );
//        List<BookCollection> collections = bookmarks.stream().map(x -> x.getBookCollection()).collect(Collectors.toList());
//        return collections;
//    }

    public Slice<Bookmark> getBookmarkByBookCollection(Long lastStoreId) {
        User findUser = getLoginUser();
        PageRequest pageRequest = PageRequest.of(0, 5);
        Slice<Bookmark> bookmarks = myPageRepositorySupport.findBookmarkCollection(pageRequest, lastStoreId, findUser.getUserId());
        return bookmarks;
    }

    public Slice<Bookmark> getBookmarkByPairing(Long lastStoreId) {
        User findUser = getLoginUser();
        PageRequest pageRequest = PageRequest.of(0, 5);
        Slice<Bookmark> bookmarks = myPageRepositorySupport.findBookmarkPairing(pageRequest, lastStoreId, findUser.getUserId());
        return bookmarks;
    }

    public Slice<Bookmark> getBookmarkByBook(Long lastStoreId) {
        User findUser = getLoginUser();
        PageRequest pageRequest = PageRequest.of(0, 5);
        Slice<Bookmark> bookmarks = myPageRepositorySupport.findBookmarkBook(pageRequest, lastStoreId, findUser.getUserId());
        return bookmarks;
    }


    public double calcBookTemp() {
        User findUser = getLoginUser();

        double basicTemp = 36.5; // 기본 온기

        long pairingCount = findUser.getPairings().size(); // 작성 페어링 개수
        long collectionCount = findUser.getCollections().size(); // 작성 컬렉션 개수
        long commentCount = findUser.getComments().size(); // 작성 코멘트 개수
        long likeCount = findUser.getLikes().size(); // 누른 좋아요 개수

        double temperature =
                basicTemp +
                        (double) pairingCount / 10 +
                        (double) collectionCount / 100 +
                        (double) (commentCount + likeCount) / 1000;

        if (findUser.getBookTemp() == 99.9) return findUser.getBookTemp();
        else return Math.round(temperature * 10) / 10.0;
    }

    public void deleteAllUserCollection() {
        User findUser = getLoginUser();
        collectionRepository.deleteAllByUser(findUser);
    }

//    public List<Pairing> getBookMarkByPairing(Long id){
//    }


    /**
     * @Valid 와 차이 확인
     */
//    public boolean validPassword(String password) {
//        Pattern pattern = Pattern.compile();
//    }
    public User updateOnFirstLogin(LoginDto.PatchDto patchDto) {
        User loginUser = getLoginUser(); // 로그인 유저 가져오기
        loginUser.setGender(patchDto.getGenderType());
        loginUser.setAge(patchDto.getAge());
        loginUser.setFirstLogin(false); // "나중에 하기" 또는 "확인" 버튼 클릭 시

        if (patchDto.getGenres() != null) {
            List<UserCategory> userCategories = patchDto.getGenres().stream()
                    .map(genre -> {
                        UserCategory userCategory = new UserCategory();
                        Category category = new Category();
                        category.setId((long) Genre.valueOf(genre).ordinal() + 1);
                        userCategory.addUser(loginUser);
                        userCategory.addCategory(category);
                        return userCategory;
                    }).collect(Collectors.toList());
            loginUser.setCategories(userCategories);
        }

        return userRepository.save(loginUser);
    }

    public User getLoginUser() { // 로그인된 유저 가져오기

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null || authentication.getName().equals("anonymousUser"))
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);

        Optional<User> optionalUser = userRepository.findByEmail(authentication.getName());
        User user = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return user;
    }

    public List<String> getAllGenre(User user) { // AOP에서 로그인한 사용자만 사용하는 용도

        return categoryRepository.findAllGenreByUserId(user.getUserId());

    }

    public User findUserByEmail(String email) { // 이메일로 유저 찾기
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return findUser;
    }

    public boolean verifyEmail(String email) { // 이메일 중복 검사
        Optional<User> verifiedUser = userRepository.findByEmail(email);
        if (verifiedUser.isPresent())
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);
        return true;
    }
}
