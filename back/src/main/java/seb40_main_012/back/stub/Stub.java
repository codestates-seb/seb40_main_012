//package seb40_main_012.back.stub;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.transaction.annotation.Transactional;
//import seb40_main_012.back.book.BookRepository;
//import seb40_main_012.back.book.BookService;
//import seb40_main_012.back.book.entity.Book;
//import seb40_main_012.back.book.entity.Genre;
//import seb40_main_012.back.bookCollection.entity.BookCollection;
//import seb40_main_012.back.bookCollection.repository.BookCollectionRepository;
//import seb40_main_012.back.bookCollection.service.BookCollectionService;
//import seb40_main_012.back.common.comment.CommentRepository;
//import seb40_main_012.back.common.comment.CommentService;
//import seb40_main_012.back.common.comment.entity.Comment;
//import seb40_main_012.back.common.comment.entity.CommentType;
//import seb40_main_012.back.pairing.PairingRepository;
//import seb40_main_012.back.pairing.PairingService;
//import seb40_main_012.back.pairing.entity.ParingCategory;
//import seb40_main_012.back.pairing.entity.Pairing;
//import seb40_main_012.back.user.entity.Category;
//import seb40_main_012.back.user.entity.User;
//import seb40_main_012.back.user.entity.UserCategory;
//import seb40_main_012.back.user.repository.CategoryRepository;
//import seb40_main_012.back.user.repository.UserCategoryRepository;
//import seb40_main_012.back.user.repository.UserRepository;
//import seb40_main_012.back.user.service.UserService;
//
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Random;
//
//@Configuration
//public class Stub {
//
//    private static final Logger log = LoggerFactory.getLogger(Stub.class);
//
//    @Bean
//    @Transactional
//    CommandLineRunner stubInit(UserRepository userRepository, UserService userService,
//                               BookRepository bookRepository, BookService bookService,
//                               BookCollectionRepository bookCollectionRepository, BookCollectionService bookCollectionService,
//                               PairingRepository pairingRepository, PairingService pairingService,
//                               CommentRepository commentRepository, CommentService commentService,
//                               CategoryRepository categoryRepository,
//                               BCryptPasswordEncoder encoder) {
//
//        for(int i = 0; i < 9; i++) {
//            Category category = new Category();
//            category.setGenre(Genre.values()[i]);
//            categoryRepository.save(category);
//        }
//
//        // ------------------------------------------------------------------------------------------
//        // USER STUB
//        // ------------------------------------------------------------------------------------------
//
//        for (long i = 1; i <= 18; i++) {
//            User user = new User();
//            long rand = (long) (Math.random() * 9) + 1;
////            long rand2 = (long) (Math.random() * 9) + 1;
//
//            UserCategory userCategory = new UserCategory();
//            Category category = new Category();
//            category.setId(rand);
//            userCategory.addUser(user);
//            userCategory.addCategory(category);
//
////            UserCategory userCategory2 = new UserCategory();
////            Category category2 = new Category();
////            category2.setId(rand2);
////            userCategory2.addUser(user);
////            userCategory2.addCategory(category2);
//
//            user.setEmail("stub_email_" + i + "@email.com");
//            user.setNickName("Stub_Potato_" + i);
//            user.setBookTemp(36.5 + Math.round((Math.random() * 15) * 10) / 10.0);
//            user.setPassword(encoder.encode("1234"));
//            user.setRoles(List.of("USER"));
//            user.setCategories(List.of(userCategory));
//
//            log.info("USER STUB " +
//                    userRepository.save(user));
//        }
//
//        User user19 = new User();
//
//        UserCategory userCategory19 = new UserCategory();
//        Category category19 = new Category();
//        category19.setId(7L);
//        userCategory19.addUser(user19);
//        userCategory19.addCategory(category19);
//
//        user19.setEmail("hayoung_sama@email.com");
//        user19.setNickName("하영사마");
//        user19.setBookTemp(99.9);
//        user19.setPassword(encoder.encode("1234"));
//        user19.setRoles(List.of("시큐리티 요정", "문제 해결사", "오전동 배두나"));
//        user19.setCategories(List.of(userCategory19));
//
//        log.info("USER STUB " +
//                userRepository.save(user19));
//
//        User user20 = new User();
//
//        UserCategory userCategory20 = new UserCategory();
//        Category category20 = new Category();
//        category20.setId(4L);
//        userCategory20.addUser(user20);
//        userCategory20.addCategory(category20);
//
//        user20.setEmail("kkomkkom_kim@email.com");
//        user20.setNickName("김꼼꼼");
//        user20.setBookTemp(99.9);
//        user20.setPassword(encoder.encode("1234"));
//        user20.setRoles(List.of("디자인 엔드포인트", "염탐 복숭아"));
//        user20.setCategories(List.of(userCategory20));
//
//        log.info("USER STUB " +
//                userRepository.save(user20));
//
//        User user21 = new User();
//
//        UserCategory userCategory21 = new UserCategory();
//        Category category21 = new Category();
//        category21.setId(1L);
//        userCategory21.addUser(user21);
//        userCategory21.addCategory(category21);
//
//        user21.setEmail("straight_kang@email.com");
//        user21.setNickName("강직진");
//        user21.setBookTemp(99.9);
//        user21.setPassword(encoder.encode("1234"));
//        user21.setRoles(List.of("술고래 도단 14세", "화서동 이연희"));
//        user21.setCategories(List.of(userCategory21));
//
//        log.info("USER STUB " +
//                userRepository.save(user21));
//
//        User user22 = new User();
//
//        UserCategory userCategory22 = new UserCategory();
//        Category category22 = new Category();
//        category22.setId(5L);
//        userCategory22.addUser(user22);
//        userCategory22.addCategory(category22);
//
//        user22.setEmail("spring_sunshine@email.com");
//        user22.setNickName("봄날의 햇살");
//        user22.setBookTemp(99.9);
//        user22.setPassword(encoder.encode("1234"));
//        user22.setRoles(List.of("인증 요정", "풀스택 마스터"));
//        user22.setCategories(List.of(userCategory22));
//
//        log.info("USER STUB " +
//                userRepository.save(user22));
//
//        User user23 = new User();
//
//        UserCategory userCategory23 = new UserCategory();
//        Category category23 = new Category();
//        category23.setId(3L);
//        userCategory23.addUser(user23);
//        userCategory23.addCategory(category23);
//
//        user23.setEmail("taeyoung@email.com");
//        user23.setNickName("걍태영");
//        user23.setBookTemp(99.9);
//        user23.setPassword(encoder.encode("1234"));
//        user23.setRoles(List.of("응원 담당"));
//        user23.setCategories(List.of(userCategory23));
//
//        log.info("USER STUB " +
//                userRepository.save(user23));
//
//        User user24 = new User();
//
//        UserCategory userCategory24 = new UserCategory();
//        Category category24 = new Category();
//        category24.setId(6L);
//        userCategory24.addUser(user24);
//        userCategory24.addCategory(category24);
//
//        user24.setEmail("smile_angel@email.com");
//        user24.setNickName("미소천사");
//        user24.setBookTemp(99.9);
//        user24.setPassword(encoder.encode("1234"));
//        user24.setRoles(List.of("작업 살인마"));
//        user24.setCategories(List.of(userCategory24));
//
//        log.info("USER STUB " +
//                userRepository.save(user24));
//
//        User user25 = new User();
//
//        UserCategory userCategory25 = new UserCategory();
//        Category category25 = new Category();
//        category25.setId(2L);
//        userCategory25.addUser(user25);
//        userCategory25.addCategory(category25);
//
//        user25.setEmail("lemonlime_serin@email.com");
//        user25.setNickName("레몬세린");
//        user24.setBookTemp(99.9);
//        user25.setPassword(encoder.encode("1234"));
//        user25.setRoles(List.of("사령탑", "텐션 담당", "상큼함 담당", "성질 담당"));
//        user25.setCategories(List.of(userCategory25));
//
//        log.info("USER STUB " +
//                userRepository.save(user25));
//
//        for (long i = 26; i <= 35; i++) {
//            User user = new User();
//            long rand = (long) (Math.random() * 9) + 1;
////            long rand2 = (long) (Math.random() * 9) + 1;
//
//            UserCategory userCategory = new UserCategory();
//            Category category = new Category();
//            category.setId(rand);
//            userCategory.addUser(user);
//            userCategory.addCategory(category);
//
////            UserCategory userCategory2 = new UserCategory();
////            Category category2 = new Category();
////            category2.setId(rand2);
////            userCategory2.addUser(user);
////            userCategory2.addCategory(category2);
//
//            user.setEmail("stub_email_" + i + "@email.com");
//            user.setNickName("Stub_Potato_" + i);
//            user.setBookTemp(36.5 + Math.round((Math.random() * 15) * 10) / 10.0);
//            user.setPassword(encoder.encode("1234"));
//            user.setRoles(List.of("USER"));
//            user.setCategories(List.of(userCategory));
//
//            log.info("USER STUB " +
//                    userRepository.save(user));
//        }
//
//        for (long i = 1; i <= 50; i++) {
//
//            log.info("BOOK STUB " +
//                    bookRepository.save(Book.builder()
//                            .isbn13("" + i)
//                            .genre(Genre.values()[new Random().nextInt(Genre.values().length)])
//                            .view((int) (Math.random() * 150))
//                            .title("Stub_Book_" + i)
//                            .averageRating((double) Math.round(
//                                    ((Math.random() * 5) * 100))
//                                    / 100
//                            )
//                            .ratingCount((int) (Math.random() * 35))
//                            .build()));
//        }
//
//        // ------------------------------------------------------------------------------------------
//        // PAIRING STUB
//        // ------------------------------------------------------------------------------------------
//
//        for (long i = 1; i <= 50; i++) {
//
//            long rand = (long) (Math.random() * 35) + 1;
//
//            log.info("PAIRING STUB " +
//                            pairingRepository.save(
//                                    Pairing.builder()
//                                            .pairingCategory(ParingCategory.values()[new Random().nextInt(ParingCategory.values().length)])
//                                            .view((int) (Math.random() * 150))
//                                            .imagePath("Stub_Image_Path_" + i)
//                                            .title("Stub_Pairing_Title_" + i)
//                                            .body("Stub_Pairing_Body_" + i)
//                                            .book(bookService.findVerifiedBook("" + i))
//                                            .user(userService.findUser(rand))
//                                            .outLinkPath("Stub_Pairing_OutLink_Path" + i)
//                                            .likeCount((long) (Math.random() * 100))
//                                            .createdAt(LocalDateTime.now())
//                                            .modifiedAt(LocalDateTime.now())
//                                            .build())
//            );
//        }
//
//        // ------------------------------------------------------------------------------------------
//        // BOOK_COLLECTION STUB
//        // ------------------------------------------------------------------------------------------
//
//        for (long i = 1; i <= 35; i++) {
//
//            log.info("BOOK_COLLECTION STUB " +
//                    bookCollectionRepository.save(BookCollection.builder()
//                            .title("Stub_Book_Collection_" + i)
//                            .content("Stub_Book_Collection_Content" + i)
//                            .author("Stub_Book_Collection_Author" + i)
//                            .tags(null)
//                            .build()));
//        }
//
//        // ------------------------------------------------------------------------------------------
//        // Random_COMMENT STUB
//        // ------------------------------------------------------------------------------------------
//
//        for (long i = 1; i <= 50; i++) {
//
//            long rand = (long) (Math.random() * 35) + 1;
//
//            log.info("PAIRING_COMMENT STUB " +
//                    commentRepository.save(
//                            Comment.builder()
//                                    .commentType(CommentType.values()[new Random().nextInt(CommentType.values().length)])
//                                    .view((int) (Math.random() * 150))
//                                    .pairing(pairingService.findPairing(i))
//                                    .user(userService.findUser(rand))
//                                    .body("Stub_Pairing_Comment_Body_" + i)
//                                    .likeCount((long) (Math.random() * 100))
//                                    .createdAt(LocalDateTime.now())
//                                    .modifiedAt(LocalDateTime.now())
//                                    .build())
//            );
//        }
//        return null;
//    }
//
//}