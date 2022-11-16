//package seb40_main_012.back.stub;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
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
//import seb40_main_012.back.pairing.entity.Pairing;
//import seb40_main_012.back.user.entity.User;
//import seb40_main_012.back.user.repository.UserRepository;
//import seb40_main_012.back.user.service.UserService;
//
//import java.time.LocalDateTime;
//
//@Configuration
//public class Stub {
//
//    private static final Logger log = LoggerFactory.getLogger(Stub.class);
//
//    @Bean
//    CommandLineRunner stubInit(UserRepository userRepository, UserService userService,
//                               BookRepository bookRepository, BookService bookService,
//                               BookCollectionRepository bookCollectionRepository, BookCollectionService bookCollectionService,
//                               PairingRepository pairingRepository, PairingService pairingService,
//                               CommentRepository commentRepository, CommentService commentService) {
//
//        for (long i = 1; i <= 18; i++) {
//            log.info("USER STUB " +
//                    userRepository.save(User.builder()
//                            .email("stub_email_" + i + "@email.com")
//                            .nickName("Stub_Potato_" + i)
//                            .build()));
//        }
//
//        log.info("USER STUB " +
//                userRepository.save(User.builder()
//                        .userId(19L)
//                        .email("hayoung_sama@email.com")
//                        .nickName("하영사마")
//                        .build()));
//
//        log.info("USER STUB " +
//                userRepository.save(User.builder()
//                        .userId(20L)
//                        .email("kkomkkom_kim@email.com")
//                        .nickName("김꼼꼼")
//                        .build())
//        );
//
//        log.info("USER STUB " +
//                userRepository.save(User.builder()
//                        .userId(21L)
//                        .email("straight_kang@email.com")
//                        .nickName("강직진")
//                        .build())
//        );
//
//        log.info("USER STUB " +
//                userRepository.save(User.builder()
//                        .userId(22L)
//                        .email("spring_sunshine@email.com")
//                        .nickName("봄날의 햇살")
//                        .build())
//        );
//
//        log.info("USER STUB " +
//                userRepository.save(User.builder()
//                        .userId(23L)
//                        .email("taeyoung@email.com")
//                        .nickName("걍태영")
//                        .build())
//        );
//
//        log.info("USER STUB " +
//                userRepository.save(User.builder()
//                        .userId(24L)
//                        .email("smile_angel@email.com")
//                        .nickName("미소천사")
//                        .build())
//        );
//
//        log.info("USER STUB " +
//                userRepository.save(User.builder()
//                        .userId(25L)
//                        .email("lemonlime_serin@email.com")
//                        .nickName("과즙세린")
//                        .build())
//        );
//
//        for (long i = 26; i <= 35; i++) {
//            log.info("USER STUB " +
//                    userRepository.save(User.builder()
//                            .email("stub_email_" + i + "@email.com")
//                            .nickName("Stub_Potato_" + i)
//                            .build()));
//        }
//
//
//        for (long i = 1; i <= 35; i++) {
//
//            long rand = (long) (Math.random() * 35) + 1;
//
//            log.info("BOOK STUB " +
//                    bookRepository.save(Book.builder()
//                            .bookId(i)
//                            .genre(Genre.NOVEL)
//                            .title("Stub_Book_" + i)
//                            .build()));
//
//            log.info("BOOK_COLLECTION STUB " +
//                    bookCollectionRepository.save(BookCollection.builder()
//                            .collectionId(i)
//                            .title("Stub_Book_Collection_" + i)
//                            .content("Stub_Book_Collection_Content" + i)
//                            .author("Stub_Book_Collection_Author" + i)
//                            .tags(null)
//                            .build()));
//
//            log.info("PAIRING STUB " +
//                    pairingRepository.save(Pairing.builder()
//                            .pairingId(i)
//                            .imagePath("Stub_Image_Path_" + i)
//                            .title("Stub_Pairing_Title_" + i)
//                            .body("Stub_Pairing_Body_" + i)
//                            .user(userService.findVerifiedUser(rand))
//                            .outLinkPath("Stub_Pairing_OutLink_Path" + i)
//                            .likeCount((long) (Math.random() * 100))
//                            .createdAt(LocalDateTime.now())
//                            .modifiedAt(LocalDateTime.now())
//                            .build()));
//
//            log.info("BOOK COMMENT STUB " +
//                    commentRepository.save(Comment.builder()
//                            .commentId(i)
//                            .commentType(CommentType.BOOK)
//                            .user(userService.findVerifiedUser(rand))
//                            .body("Stub_Book_Comment_Body_" + i)
//                            .likeCount((long) (Math.random() * 100))
//                            .createdAt(LocalDateTime.now())
//                            .modifiedAt(LocalDateTime.now())
//                            .build()));
//
//            log.info("PAIRING COMMENT STUB " +
//                    commentRepository.save(Comment.builder()
//                            .commentId(i + 35)
//                            .commentType(CommentType.PAIRING)
//                            .user(userService.findVerifiedUser(rand))
//                            .body("Stub_Pairing_Comment_Body_" + i)
//                            .likeCount((long) (Math.random() * 100))
//                            .createdAt(LocalDateTime.now())
//                            .modifiedAt(LocalDateTime.now())
//                            .build()));
//        }
//
//        return null;
//    }
//
//}
