package seb40_main_012.back.stub;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.book.BookRepository;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.book.entity.Genre;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.repository.BookCollectionRepository;
import seb40_main_012.back.bookCollection.repository.BookCollectionTagRepository;
import seb40_main_012.back.bookCollection.repository.TagRepository;
import seb40_main_012.back.bookCollection.service.BookCollectionService;
import seb40_main_012.back.bookCollectionBook.BookCollectionBook;
import seb40_main_012.back.bookCollectionBook.BookCollectionBookRepository;
import seb40_main_012.back.common.bookmark.Bookmark;
import seb40_main_012.back.common.bookmark.BookmarkRepository;
import seb40_main_012.back.common.bookmark.BookmarkType;
import seb40_main_012.back.common.comment.CommentRepository;
import seb40_main_012.back.common.comment.CommentService;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.comment.entity.CommentType;
import seb40_main_012.back.follow.FollowRepository;
import seb40_main_012.back.pairing.PairingRepository;
import seb40_main_012.back.pairing.PairingService;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.pairing.entity.ParingCategory;
import seb40_main_012.back.user.entity.Category;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.entity.UserCategory;
import seb40_main_012.back.user.entity.enums.AgeType;
import seb40_main_012.back.user.entity.enums.GenderType;
import seb40_main_012.back.user.repository.CategoryRepository;
import seb40_main_012.back.user.repository.UserRepository;
import seb40_main_012.back.user.service.UserService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Configuration
public class Stub {

    private static final Logger log = LoggerFactory.getLogger(Stub.class);

    @Bean
    @Transactional
    CommandLineRunner stubInit(UserRepository userRepository, UserService userService,
                               BookRepository bookRepository, BookService bookService,
                               BookCollectionTagRepository collectionTagRepository,
                               BookCollectionBookRepository collectionBookRepository,
                               TagRepository tagRepository,
                               BookCollectionRepository bookCollectionRepository, BookCollectionService bookCollectionService,
                               PairingRepository pairingRepository, PairingService pairingService,
                               CommentRepository commentRepository, CommentService commentService,
                               CategoryRepository categoryRepository, FollowRepository followRepository,
                               BCryptPasswordEncoder encoder, BookmarkRepository bookmarkRepository) {

        for (int i = 0; i < 9; i++) {
            Category category = new Category();
            category.setGenre(Genre.values()[i]);
            categoryRepository.save(category);
        }

        // ------------------------------------------------------------------------------------------
        // USER STUB
        // ------------------------------------------------------------------------------------------

        for (long i = 1; i <= 18; i++) {
            User user = new User();
            long rand = (long) (Math.random() * 9) + 1;
            UserCategory userCategory = new UserCategory();
            Category category = new Category();
            category.setId(rand);
            userCategory.addUser(user);
            userCategory.addCategory(category);
            user.setEmail("stub_email_" + i + "@email.com");
            user.setNickName("Stub_Potato_" + i);
            user.setBookTemp(36.5 + Math.round((Math.random() * 15) * 10) / 10.0);
            user.setPassword(encoder.encode("1234"));
            user.setRoles(List.of("USER"));
            user.setCategories(List.of(userCategory));

            log.info("USER STUB " +
                    userRepository.save(user));
        }

        User user19 = new User();

        UserCategory userCategory19 = new UserCategory();
        Category category19 = new Category();
        category19.setId(7L);
        userCategory19.addUser(user19);
        userCategory19.addCategory(category19);

        user19.setEmail("hayoung_sama@email.com");
        user19.setNickName("하영사마");
        user19.setBookTemp(99.9);
        user19.setPassword(encoder.encode("1234"));
        user19.setRoles(List.of("시큐리티 요정", "문제 해결사", "오전동 배두나"));
        user19.setCategories(List.of(userCategory19));

        log.info("USER STUB " +
                userRepository.save(user19));

        User user20 = new User();

        UserCategory userCategory20 = new UserCategory();
        Category category20 = new Category();
        category20.setId(4L);
        userCategory20.addUser(user20);
        userCategory20.addCategory(category20);

        user20.setEmail("kkomkkom_kim@email.com");
        user20.setNickName("김꼼꼼");
        user20.setBookTemp(99.9);
        user20.setPassword(encoder.encode("1234"));
        user20.setRoles(List.of("디자인 실장", "염탐 복숭아", "코딩 테레사"));
        user20.setCategories(List.of(userCategory20));

        log.info("USER STUB " +
                userRepository.save(user20));

        User user21 = new User();

        UserCategory userCategory21 = new UserCategory();
        Category category21 = new Category();
        category21.setId(1L);
        userCategory21.addUser(user21);
        userCategory21.addCategory(category21);

        user21.setEmail("straight_kang@email.com");
        user21.setNickName("강직진");
        user21.setBookTemp(99.9);
        user21.setPassword(encoder.encode("1234"));
        user21.setRoles(List.of("술고래 도단 14세", "화서동 이연희"));
        user21.setCategories(List.of(userCategory21));

        log.info("USER STUB " +
                userRepository.save(user21));

        User user22 = new User();

        UserCategory userCategory22 = new UserCategory();
        Category category22 = new Category();
        category22.setId(5L);
        userCategory22.addUser(user22);
        userCategory22.addCategory(category22);

        user22.setEmail("spring_sunshine@email.com");
        user22.setNickName("봄날의 햇살");
        user22.setBookTemp(99.9);
        user22.setGender(GenderType.FEMALE);
        user22.setAge(AgeType.TWENTIES);
        user22.setPassword(encoder.encode("1234"));
        user22.setRoles(List.of("인증 요정", "풀스택 마스터", "고정 성애자"));
        user22.setCategories(List.of(userCategory22));

        log.info("USER STUB " +
                userRepository.save(user22));

        User user23 = new User();

        UserCategory userCategory23 = new UserCategory();
        Category category23 = new Category();
        category23.setId(3L);
        userCategory23.addUser(user23);
        userCategory23.addCategory(category23);

        user23.setEmail("taeyoung@email.com");
        user23.setNickName("걍태영");
        user23.setBookTemp(99.9);
        user23.setPassword(encoder.encode("1234"));
        user23.setRoles(List.of("응원 담당"));
        user23.setCategories(List.of(userCategory23));

        log.info("USER STUB " +
                userRepository.save(user23));

        User user24 = new User();

        UserCategory userCategory24 = new UserCategory();
        Category category24 = new Category();
        category24.setId(6L);
        userCategory24.addUser(user24);
        userCategory24.addCategory(category24);

        user24.setEmail("smile_angel@email.com");
        user24.setNickName("미소천사");
        user24.setBookTemp(99.9);
        user24.setPassword(encoder.encode("1234"));
        user24.setRoles(List.of("작업 살인마", "바다 감별사"));
        user24.setCategories(List.of(userCategory24));

        log.info("USER STUB " +
                userRepository.save(user24));

        User user25 = new User();

        UserCategory userCategory25 = new UserCategory();
        Category category25 = new Category();
        category25.setId(2L);
        userCategory25.addUser(user25);
        userCategory25.addCategory(category25);

        user25.setEmail("lemonlime_serin@email.com");
        user25.setNickName("레몬세린");
        user25.setBookTemp(99.9);
        user25.setPassword(encoder.encode("1234"));
        user25.setRoles(List.of("방튼튼", "사령탑", "텐션 담당", "상큼함 담당", "성질 담당"));
        user25.setCategories(List.of(userCategory25));

        log.info("USER STUB " +
                userRepository.save(user25));


        for (long i = 26; i <= 35; i++) {
            User user = new User();
            long rand = (long) (Math.random() * 9) + 1;
//            long rand2 = (long) (Math.random() * 9) + 1;

            UserCategory userCategory = new UserCategory();
            Category category = new Category();
            category.setId(rand);
            userCategory.addUser(user);
            userCategory.addCategory(category);

//            UserCategory userCategory2 = new UserCategory();
//            Category category2 = new Category();
//            category2.setId(rand2);
//            userCategory2.addUser(user);
//            userCategory2.addCategory(category2);

            user.setEmail("stub_email_" + i + "@email.com");
            user.setNickName("Stub_Potato_" + i);
            user.setBookTemp(36.5 + Math.round((Math.random() * 15) * 10) / 10.0);
            user.setPassword(encoder.encode("1234"));
            user.setRoles(List.of("USER"));
            user.setCategories(List.of(userCategory));

            log.info("USER STUB " +
                    userRepository.save(user));
        }

        // ------------------------------------------------------------------------------------------
        // BOOK STUB
        // ------------------------------------------------------------------------------------------

        for (long i = 1; i <= 50; i++) {

            log.info("BOOK STUB " +
                    bookRepository.save(Book.builder()
                            .isbn13("" + i)
                            .genre(Genre.values()[new Random().nextInt(Genre.values().length)])
                            .view((int) (Math.random() * 150))
                            .title("Stub_Book_" + i)
                            .averageRating((double) Math.round(
                                    ((Math.random() * 5) * 100))
                                    / 100
                            )
                            .ratingCount((int) (Math.random() * 35))
                            .build()));
        }

        // ------------------------------------------------------------------------------------------
        // 컬렉션용 BOOK STUB
        // ------------------------------------------------------------------------------------------

        for (long i = 1; i <= 50; i++) {

            log.info("BOOK STUB " +
                    bookRepository.save(Book.builder()
                            .isbn13("" + i)
                            .genre(Genre.values()[new Random().nextInt(Genre.values().length)])
                            .view((int) (Math.random() * 150))
                            .author("양귀자 (지은이)")
                            .cover("https://image.aladin.co.kr/product/2584/37/cover/8998441012_2.jpg")
                            .title("Stub_Book_" + i)
                            .averageRating((double) Math.round(
                                    ((Math.random() * 5) * 100))
                                    / 100
                            )
                            .ratingCount((int) (Math.random() * 35))
                            .build()));
        }

        // ------------------------------------------------------------------------------------------
        // PAIRING STUB
        // ------------------------------------------------------------------------------------------

        for (long i = 1; i <= 50; i++) {

            long rand = (long) (Math.random() * 35) + 1;

            log.info("PAIRING STUB " +
                    pairingRepository.save(
                            Pairing.builder()
                                    .pairingCategory(ParingCategory.values()[new Random().nextInt(ParingCategory.values().length)])
                                    .view((int) (Math.random() * 150))
                                    .imagePath("Stub_Image_Path_" + i)
                                    .title("Stub_Pairing_Title_" + i)
                                    .body("Stub_Pairing_Body_" + i)
                                    .book(bookService.findVerifiedBook("" + i))
                                    .user(userService.findVerifiedUser(rand))
                                    .imagePath("Stub_Image_Path" + i)
                                    .outLinkPath("Stub_Pairing_OutLink_Path" + i)
                                    .likeCount((long) (Math.random() * 100))
                                    .createdAt(LocalDateTime.now())
                                    .modifiedAt(LocalDateTime.now())
                                    .build())
            );
        }

        // ------------------------------------------------------------------------------------------
        // BOOK_COLLECTION STUB
        // ------------------------------------------------------------------------------------------

        for (long i = 1; i <= 35; i++) {

            long rand1 = (long) (Math.random() * 100) + 1;
            long rand2 = (long) (Math.random() * 100) + 1;
            long rand3 = (long) (Math.random() * 35) + 1;
            long rand4 = (long) (Math.random() * 50) + 1;
            long rand5 = (long) (Math.random() * 50) + 1;
            long rand6 = (long) (Math.random() * 50) + 1;

            log.info("BOOK_COLLECTION STUB " +
                    bookCollectionRepository.save(BookCollection.builder()
                            .title("Stub_Book_Collection_" + i)
                            .user(userService.findVerifiedUser(rand3))
                            .content("Stub_Book_Collection_Content" + i)
                            .likeCount(rand1)
                            .userLike(false)
                            .userBookmark(false)
                            .userCollection(false)
                            .view(rand2)
                            .bookIsbn13(Stream.of(String.valueOf(rand3), String.valueOf(rand4), String.valueOf(rand5), String.valueOf(rand6))
                                    .distinct().collect(Collectors.toList()))
                            .createdAt(LocalDateTime.now())
                            .lastModifiedAt(LocalDate.now())
                            .collectionTags(null)
                            .build()));
        }

        // ------------------------------------------------------------------------------------------
        // Random_COMMENT STUB
        // ------------------------------------------------------------------------------------------

        for (long i = 1; i <= 50; i++) {

            long rand = (long) (Math.random() * 35) + 1;

            log.info("PAIRING_COMMENT STUB " +
                    commentRepository.save(
                            Comment.builder()
                                    .commentType(CommentType.PAIRING)
                                    .view((int) (Math.random() * 150))
                                    .pairing(pairingService.findPairing(i))
                                    .user(userService.findVerifiedUser(rand))
                                    .body("Stub_Pairing_Comment_Body_" + i)
                                    .likeCount((long) (Math.random() * 100))
                                    .createdAt(LocalDateTime.now())
                                    .modifiedAt(LocalDateTime.now())
                                    .build())
            );
        }

//        for (long i = 1; i <= 10; i++) {
//
//            log.info("Following " +
//                    followRepository.save(
//                            Follow.builder()
//                                    .followingUser(User.builder().userId(i).build())
//                                    .followedUser(User.builder().userId(22L).build())
//                                    .createDate(new Timestamp(System.currentTimeMillis()))
//                                    .build())
//            );
//        }
//
//        for (long i = 11; i <= 20; i++) {
//
//            log.info("Following " +
//                    followRepository.save(
//                            Follow.builder()
//                                    .followingUser(User.builder().userId(22L).build())
//                                    .followedUser(User.builder().userId(i).build())
//                                    .createDate(new Timestamp(System.currentTimeMillis()))
//                                    .build())
//            );
//        }

//        ------------------------------------------------------------------------------------------
//        ------------------------------------------------------------------------------------------
//        ------------------------------------------------------------------------------------------
//        ------------------------------------------------------------------------------------------
        // 세린님 전용 STUB DATA
//        ------------------------------------------------------------------------------------------
//        ------------------------------------------------------------------------------------------
        for (long i = 1; i <= 15; i++) {

            long rand = (long) (Math.random() * 35) + 1;

            log.info("BOOK_COMMENT STUB " +
                    commentRepository.save(
                            Comment.builder()
                                    .commentType(CommentType.BOOK)
                                    .view((int) (Math.random() * 150))
                                    .book(bookService.findBook("1"))
                                    .user(userService.findVerifiedUser(rand))
                                    .body("Stub_Book_Comment_Body_" + i)
                                    .likeCount((long) (Math.random() * 100))
                                    .createdAt(LocalDateTime.now())
                                    .modifiedAt(LocalDateTime.now())
                                    .build())
            );
        }

        for (long i = 1; i <= 15; i++) {

            long rand = (long) (Math.random() * 15) + 1;

            log.info("PAIRING STUB " +
                    pairingRepository.save(
                            Pairing.builder()
                                    .pairingCategory(ParingCategory.values()[new Random().nextInt(ParingCategory.values().length)])
                                    .view((int) (Math.random() * 150))
                                    .imagePath("Stub_Image_Path_" + i)
                                    .title("Stub_Pairing_Title_" + i)
                                    .body("Stub_Pairing_Body_" + i)
                                    .book(bookService.findVerifiedBook("1"))
                                    .user(userService.findVerifiedUser(rand))
                                    .imagePath("Stub_Image_Path_" + i)
                                    .outLinkPath("Stub_Pairing_OutLink_Path" + i)
                                    .likeCount((long) (Math.random() * 100))
                                    .createdAt(LocalDateTime.now())
                                    .modifiedAt(LocalDateTime.now())
                                    .build())
            );
        }

        for (long i = 1; i <= 17; i++) {

            long rand1 = (long) (Math.random() * 100) + 1;
            long rand2 = (long) (Math.random() * 100) + 1;
            long rand3 = (long) (Math.random() * 30) + 1;

            log.info("BOOK_COLLECTION STUB " +
                    bookCollectionRepository.save(BookCollection.builder()
                            .title("Stub_Book_Collection_" + i)
                            .user(userService.findVerifiedUser(rand3))
                            .content("Stub_Book_Collection_Content" + i)
                            .likeCount(rand1)
                            .view(rand2)
                            .bookIsbn13(Stream.of(String.valueOf(1), String.valueOf(3), String.valueOf(5), String.valueOf(7))
                                    .distinct().collect(Collectors.toList()))
                            .createdAt(LocalDateTime.now())
                            .lastModifiedAt(LocalDate.now())
                            .collectionTags(null)
                            .build()));
        }

        // ------------------------------------------------------------------------------------------
        // BOOK_COLLECTION_COMMENT Stub
        // ------------------------------------------------------------------------------------------

        for (long i = 1; i <= 52; i++) {

            long rand = (long) (Math.random() * 35) + 1;

            log.info("BOOK_COLLECTION_COMMENT STUB " +
                    commentRepository.save(
                            Comment.builder()
                                    .commentType(CommentType.BOOK_COLLECTION)
                                    .view((int) (Math.random() * 150))
                                    .bookCollection(bookCollectionService.findVerifiedCollection(i))
                                    .user(userService.findVerifiedUser(rand))
                                    .body("Stub_Book_Collection_Comment_Body_" + i)
                                    .likeCount((long) (Math.random() * 100))
                                    .createdAt(LocalDateTime.now())
                                    .modifiedAt(LocalDateTime.now())
                                    .build())
            );
        }

//        ------------------------------------------------------------------------------------------
//              컬렉션 테스트용 stub
//        ------------------------------------------------------------------------------------------


//        User findUser = userService.findVerifiedUser(1L);
//
//        BookCollection bookCollection = bookCollectionRepository.save(BookCollection.builder()
//                .book(bookService.findBook("1"))
//                .title("컬렉션 타이틀")
//                .content("컬렉션 본문")
//                .likeCount(1L)
//                .view(3L)
//                .collectionTags(null)
//                .user(findUser)
//                .createdAt(LocalDateTime.now())
//                .build());
//
//        log.info("BOOK_COLLECTION STUB " + bookCollection);
//
//        bookCollection.setCollectionTag();
//
//        Tag newTag = new Tag("x");
//        tagRepository.save(newTag);
//        BookCollectionTag collectionTag = new BookCollectionTag(bookCollection, newTag);
//        bookCollectionRepository.save(bookCollection);
//        collectionTagRepository.save(collectionTag);
//        bookCollection.addCollectionTag(collectionTag);
//        findUser.addBookCollection(bookCollection);
//        bookCollection.addUser(findUser);
//
//        Book newBook = bookService.updateView("x");
//        BookCollectionBook findCollectionBook = new BookCollectionBook(newBook, bookCollection);
//        collectionBookRepository.save(findCollectionBook);
//        bookCollection.addCollectionBook(findCollectionBook);


        User user26 = new User();


        UserCategory userCategory26 = new UserCategory();
        Category category26 = new Category();
        category26.setId(1L);
        userCategory26.addUser(user26);
        userCategory26.addCategory(category26);

        user26.setEmail("collection@email.com");
        user26.setNickName("컬렉션 유저");
        user26.setGender(GenderType.FEMALE);
        user26.setIntroduction("hi i m groot");
        user26.setAge(AgeType.OTHERS);
        user26.setBookTemp(99.9);
        user26.setPassword(encoder.encode("1234"));
        user26.setRoles(List.of("USER"));
        user26.setCategories(List.of(userCategory26));

        log.info("USER STUB " +
                userRepository.save(user26));


//        ------------------------------------------------------------------------------------------
//        ------------------------------------------------------------------------------------------
        user24.setCollectionBookmarks(List.of(
                Bookmark.builder()
                        .bookmarkId(1L)
                        .user(user24)
                        .bookCollection(bookCollectionService.findVerifiedCollection(1L))
                        .bookmarkType(BookmarkType.COLLECTION)
                        .build(),
                Bookmark.builder()
                        .bookmarkId(2L)
                        .user(user24)
                        .book(bookService.findBook("1"))
                        .bookmarkType(BookmarkType.BOOK)
                        .build(),
                Bookmark.builder()
                        .bookmarkId(3L)
                        .user(user24)
                        .pairing(pairingService.findPairing(1L))
                        .bookmarkType(BookmarkType.PAIRING)
                        .build())
        );

        userRepository.save(user24);
//        ------------------------------------------------------------------------------------------
//        ------------------------------------------------------------------------------------------
        // 정우님 전용 캐러셀 테스트를 위한 STUB
//        ------------------------------------------------------------------------------------------
//        ------------------------------------------------------------------------------------------

        for (long i = 1; i <= 50; i++) {

            long rand = (long) (Math.random() * 35) + 1;
            long rand2 = (long) (Math.random() * 100) + 1;

            log.info("BOOK_COMMENT STUB " +
                    commentRepository.save(
                            Comment.builder()
                                    .commentType(CommentType.BOOK)
                                    .view((int) (Math.random() * 150))
                                    .book(bookService.findBook(Long.toString(i)))
                                    .user(userService.findVerifiedUser(rand))
                                    .body("Stub_Book_Comment_Body_" + rand)
                                    .likeCount((long) (Math.random() * 100))
                                    .createdAt(LocalDateTime.now())
                                    .modifiedAt(LocalDateTime.now())
                                    .build())
            );
        }

        for (long i = 1; i <= 50; i++) {

            long rand = (long) (Math.random() * 35) + 1;

            log.info("BOOK_COMMENT STUB " +
                    commentRepository.save(
                            Comment.builder()
                                    .commentType(CommentType.BOOK)
                                    .view((int) (Math.random() * 150))
                                    .book(bookService.findBook(Long.toString(i)))
                                    .user(userService.findVerifiedUser(rand))
                                    .body("Stub_Book_Comment_Body_" + rand)
                                    .likeCount((long) (Math.random() * 100))
                                    .createdAt(LocalDateTime.now())
                                    .modifiedAt(LocalDateTime.now())
                                    .build())
            );
        }

        for (long i = 1; i <= 50; i++) {

            long rand = (long) (Math.random() * 35) + 1;

            log.info("BOOK_COMMENT STUB " +
                    commentRepository.save(
                            Comment.builder()
                                    .commentType(CommentType.BOOK)
                                    .view((int) (Math.random() * 150))
                                    .book(bookService.findBook(Long.toString(i)))
                                    .user(userService.findVerifiedUser(rand))
                                    .body("Stub_Book_Comment_Body_" + rand)
                                    .likeCount((long) (Math.random() * 100))
                                    .createdAt(LocalDateTime.now())
                                    .modifiedAt(LocalDateTime.now())
                                    .build())
            );
        }

        for (long i = 1; i <= 40; i++) {

            long rand = (long) (Math.random() * 35) + 1;

            log.info("BOOK_COMMENT STUB " +
                    commentRepository.save(
                            Comment.builder()
                                    .commentType(CommentType.BOOK)
                                    .view((int) (Math.random() * 150))
                                    .book(bookService.findBook(Long.toString(i)))
                                    .user(userService.findVerifiedUser(rand))
                                    .body("Stub_Book_Comment_Body_" + rand)
                                    .likeCount((long) (Math.random() * 100))
                                    .createdAt(LocalDateTime.now())
                                    .modifiedAt(LocalDateTime.now())
                                    .build())
            );
        }

//        ------------------------------------------------------------------------------------------
//        ------------------------------------------------------------------------------------------

        return null;
    }

}