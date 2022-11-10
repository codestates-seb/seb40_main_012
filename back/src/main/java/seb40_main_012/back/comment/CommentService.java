package seb40_main_012.back.comment;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.book.BookRepository;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.comment.entity.Comment;
import seb40_main_012.back.pairing.PairingRepository;
import seb40_main_012.back.pairing.PairingService;

@Service
@Transactional
public class CommentService {

//    private final CommentRepository commentRepository;
//    private final BookService bookService;
//    private final BookRepository bookRepository;
//    private final PairingService pairingService;
//    private final PairingRepository pairingRepository;
//    private final BookCollectionService bookCollectionService;
//    private final BookCollectionRepository bookCollectionRepository;
//
//    public CommentService(CommentRepository commentRepository, BookService bookService, BookRepository bookRepository,
//                          PairingService pairingService, PairingRepository pairingRepository,
//                          BookCollectionService bookCollectionService, BookCollectionRepository bookCollectionRepository) {
//        this.commentRepository = commentRepository;
//        this.bookService = bookService;
//        this.bookRepository = bookRepository;
//        this.pairingService = pairingService;
//        this.pairingRepository = pairingRepository;
//        this.bookCollectionService = bookCollectionService;
//        this.bookCollectionRepository = bookCollectionRepository;
//    }

    public Comment createBookComment(Comment comment) {
        return null;
    }

    public Comment createPairComment(Comment comment) {
        return null;
    }

    public Comment createBookCollectionComment(Comment comment) {
        return null;
    }

    public Comment updateComment(Comment comment) {
        return null;
    }

    public Page<Comment> findComments(int page, int size) {
        return null;
    }

    public void deleteComment(long commentId) {
    }

    public void verifyComment(long userId, Comment comment) {
    }

    public void findVerifiedComment(long commentId) {
    }
}
