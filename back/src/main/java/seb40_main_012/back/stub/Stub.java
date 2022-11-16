package seb40_main_012.back.stub;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
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
import seb40_main_012.back.bookCollection.service.BookCollectionService;
import seb40_main_012.back.common.comment.CommentRepository;
import seb40_main_012.back.common.comment.CommentService;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.comment.entity.CommentType;
import seb40_main_012.back.pairing.PairingRepository;
import seb40_main_012.back.pairing.PairingService;
import seb40_main_012.back.pairing.entity.ParingCategory;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.repository.UserRepository;
import seb40_main_012.back.user.service.UserService;

import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class Stub {

    private static final Logger log = LoggerFactory.getLogger(Stub.class);

    @Bean
    @Transactional
    CommandLineRunner stubInit(UserRepository userRepository, UserService userService,
                               BookRepository bookRepository, BookService bookService,
                               BookCollectionRepository bookCollectionRepository, BookCollectionService bookCollectionService,
                               PairingRepository pairingRepository, PairingService pairingService,
                               CommentRepository commentRepository, CommentService commentService,
                               BCryptPasswordEncoder encoder) {

        // ------------------------------------------------------------------------------------------
        // USER STUB
        // ------------------------------------------------------------------------------------------
        for (long i = 1; i <= 18; i++) {
            log.info("USER STUB " +
                    userRepository.save(User.builder()
                            .email("stub_email_" + i + "@email.com")
                            .nickName("Stub_Potato_" + i)
                            .password(encoder.encode("1234"))
                            .roles(List.of("USER"))
                            .build()));
        }

        log.info("USER STUB " +
                userRepository.save(User.builder()
                        .email("hayoung_sama@email.com")
                        .nickName("하영사마")
                        .password(encoder.encode("1234"))
                        .roles(List.of("a.k.a. 시큐리티 요정"))
                        .build()));

        log.info("USER STUB " +
                userRepository.save(User.builder()
                        .email("kkomkkom_kim@email.com")
                        .nickName("김꼼꼼")
                        .password(encoder.encode("1234"))
                        .roles(List.of("a.k.a. 디자인 엔드포인트"))
                        .build())
        );

        log.info("USER STUB " +
                userRepository.save(User.builder()
                        .email("straight_kang@email.com")
                        .nickName("강직진")
                        .password(encoder.encode("1234"))
                        .roles(List.of("a.k.a. 술고래 도단 14세"))
                        .build())
        );

        log.info("USER STUB " +
                userRepository.save(User.builder()
                        .email("spring_sunshine@email.com")
                        .nickName("봄날의 햇살")
                        .password(encoder.encode("1234"))
                        .roles(List.of("a.k.a. 풀스택 마스터"))
                        .build())
        );

        log.info("USER STUB " +
                userRepository.save(User.builder()
                        .email("taeyoung@email.com")
                        .nickName("걍태영")
                        .password(encoder.encode("1234"))
                        .roles(List.of("응원 담당"))
                        .build())
        );

        log.info("USER STUB " +
                userRepository.save(User.builder()
                        .email("smile_angel@email.com")
                        .nickName("미소천사")
                        .password(encoder.encode("1234"))
                        .roles(List.of("a.k.a. 소리없는 작업왕"))
                        .build())
        );

        log.info("USER STUB " +
                userRepository.save(User.builder()
                        .email("lemonlime_serin@email.com")
                        .nickName("과즙세린")
                        .password(encoder.encode("1234"))
                        .roles(List.of("a.k.a. 사령탑 & 텐션 담당"))
                        .build())
        );

        for (long i = 26; i <= 35; i++) {
            log.info("USER STUB " +
                    userRepository.save(User.builder()
                            .roles(List.of("USER"))
                            .email("stub_email_" + i + "@email.com")
                            .nickName("Stub_Potato_" + i)
                            .password(encoder.encode("1234"))
                            .roles(List.of("USER"))
                            .build()));
        }

        for (long i = 1; i <= 35; i++) {

            log.info("BOOK STUB " +
                    bookRepository.save(Book.builder()
                            .genre(Genre.NOVEL)
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
        // PAIRING STUB
        // ------------------------------------------------------------------------------------------

        for (long i = 1; i <= 35; i++) {

            long rand = (long) (Math.random() * 35) + 1;

            log.info("PAIRING STUB " +
                    pairingRepository.save(
                            Pairing.builder()
                                    .pairingCategory(ParingCategory.FILM)
                                    .view((int) (Math.random() * 150))
                                    .imagePath("Stub_Image_Path_" + i)
                                    .title("Stub_Pairing_Title_" + i)
                                    .body("Stub_Pairing_Body_" + i)
                                    .book(bookService.findVerifiedBook(i))
                                    .user(userService.findUser(rand))
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

            log.info("BOOK_COLLECTION STUB " +
                    bookCollectionRepository.save(BookCollection.builder()
                            .title("Stub_Book_Collection_" + i)
                            .content("Stub_Book_Collection_Content" + i)
                            .author("Stub_Book_Collection_Author" + i)
                            .tags(null)
                            .build()));
        }

        // ------------------------------------------------------------------------------------------
        // BOOK_COMMENT STUB
        // ------------------------------------------------------------------------------------------

        for (long i = 1; i <= 35; i++) {

            long rand = (long) (Math.random() * 35) + 1;

            log.info("BOOK_COMMENT STUB " +
                    commentRepository.save(
                            Comment.builder()
                                    .commentType(CommentType.BOOK)
                                    .view((int) (Math.random() * 150))
                                    .book(bookService.findBook(i))
                                    .user(userService.findUser(rand))
                                    .body("Stub_Book_Comment_Body_" + i)
                                    .likeCount((long) (Math.random() * 100))
                                    .createdAt(LocalDateTime.now())
                                    .modifiedAt(LocalDateTime.now())
                                    .build())
            );
        }

        // ------------------------------------------------------------------------------------------
        // PAIRING_COMMENT STUB
        // ------------------------------------------------------------------------------------------

        for (long i = 1; i <= 35; i++) {

            long rand = (long) (Math.random() * 35) + 1;

            log.info("PAIRING_COMMENT STUB " +
                    commentRepository.save(
                            Comment.builder()
                                    .commentType(CommentType.PAIRING)
                                    .view((int) (Math.random() * 150))
                                    .pairing(pairingService.findPairing(i))
                                    .user(userService.findUser(rand))
                                    .body("Stub_Pairing_Comment_Body_" + i)
                                    .likeCount((long) (Math.random() * 100))
                                    .createdAt(LocalDateTime.now())
                                    .modifiedAt(LocalDateTime.now())
                                    .build())
            );
        }
        return null;
    }

}