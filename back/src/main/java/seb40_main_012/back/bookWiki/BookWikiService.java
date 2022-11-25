package seb40_main_012.back.bookWiki;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.service.UserService;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookWikiService {

    private final BookService bookService;
    private final BookWikiRepository bookWikiRepository;
    private final UserService userService;

    public BookWiki createBookWiki(String isbn13, BookWiki bookWiki){

        User findUser = userService.getLoginUser();

        Book findBook = bookService.findVerifiedBook(isbn13);

        if (findBook.getBookWiki() != null) throw new BusinessLogicException(ExceptionCode.BOOK_WIKI_EXISTS);

        bookWiki.setBook(findBook);
        bookWiki.setCreatedAt(LocalDateTime.now());

        return bookWikiRepository.save(bookWiki);

//        Optional<Book> optionalBook = bookRepository.findByIsbn13(isbn13);
//
//        if (optionalBook.isEmpty()) {
//
//            String categoryName = bookInfoSearchService.bookSearch(isbn13).getItem().get(0).categoryName;
//
//            Book savedBook =
//                    Book.builder()
//                            .isbn13(isbn13)
//                            .build();
//
//            if (categoryName.matches(".*소설/시/희곡>.*소설")) savedBook.setGenre(Genre.NOVEL);
//            else if (categoryName.matches(".*에세이>.*에세이")) savedBook.setGenre(Genre.ESSAY);
//            else if (categoryName.matches(".*소설/시/희곡>.*시")) savedBook.setGenre(Genre.POEM);
//            else if (categoryName.matches(".*예술/대중문화>.*")) savedBook.setGenre(Genre.ART);
//            else if (categoryName.matches(".*>인문학>.*")) savedBook.setGenre(Genre.HUMANITIES);
//            else if (categoryName.matches(".*>사회과학>.*")) savedBook.setGenre(Genre.SOCIAL);
//            else if (categoryName.matches(".*>과학>.*")) savedBook.setGenre(Genre.NATURAL);
//            else if (categoryName.matches(".*>만화>.*")) savedBook.setGenre(Genre.COMICS);
//            else savedBook.setGenre(Genre.ETC);
//
//            bookRepository.save(savedBook);
//
//            Pairing savedPairing =
//                    Pairing.builder()
//                            .book(savedBook)
//                            .user(findUser)
//                            .pairingCategory(pairing.getPairingCategory())
//                            .imagePath(pairing.getImagePath())
//                            .title(pairing.getTitle())
//                            .body(pairing.getBody())
//                            .outLinkPath(pairing.getOutLinkPath())
//                            .createdAt(LocalDateTime.now())
//                            .modifiedAt(LocalDateTime.now())
//                            .build();
//
//            savedBook.getPairings().add(savedPairing);
//
//            return pairingRepository.save(savedPairing);
//
//        } else {
//
//            Book findBook = optionalBook.get();
//
//            Pairing savedPairing =
//                    Pairing.builder()
//                            .book(findBook)
//                            .user(findUser)
//                            .pairingCategory(pairing.getPairingCategory())
//                            .imagePath(pairing.getImagePath())
//                            .title(pairing.getTitle())
//                            .body(pairing.getBody())
//                            .outLinkPath(pairing.getOutLinkPath())
//                            .createdAt(LocalDateTime.now())
//                            .modifiedAt(LocalDateTime.now())
//                            .build();
//
//            findBook.getPairings().add(savedPairing);
//
//            return pairingRepository.save(savedPairing);
//        }


    }

    public BookWiki updateBookWiki(BookWiki bookWiki, long bookWikiId){ // 로그인한 사용자면 누구나 수정 가능

        User findUser = userService.getLoginUser();

        BookWiki findBookWiki = findVerifiedBookWiki(bookWikiId);

        BookWiki updatedBookWiki =
                BookWiki.builder()
                        .book(findBookWiki.getBook())
                        .bookWikiId(bookWikiId)
                        .view(findBookWiki.getView())
                        .imagePath(bookWiki.getImagePath())
                        .spacetimeBackground(bookWiki.getSpacetimeBackground())
                        .characterTree(bookWiki.getCharacterTree())
                        .objectInside(bookWiki.getObjectInside())
                        .trivia(bookWiki.getTrivia())
                        .appendix(bookWiki.getAppendix())
                        .objectOutside(bookWiki.getObjectOutside())
                        .createdAt(findBookWiki.getCreatedAt())
                        .modifiedAt(LocalDateTime.now())
                        .build();

        return bookWikiRepository.save(updatedBookWiki);
    }

    public void updateView(long bookWikiId){

        BookWiki findBookWiki = findVerifiedBookWiki(bookWikiId);

        findBookWiki.setView(findBookWiki.getView() + 1); // View +1

        bookWikiRepository.save(findBookWiki);
    }

    public BookWiki findBookWiki(long bookWikiId){
        return findVerifiedBookWiki(bookWikiId);
    }

    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    // 필요한가?
    public BookWiki deleteBookWiki(long bookWikiId){
        return null;
    }
    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------

    public BookWiki findVerifiedBookWiki(long BookWikiId) {

        Optional<BookWiki> optionalBookWiki = bookWikiRepository.findById(BookWikiId);
        return optionalBookWiki.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOOK_WIKI_NOT_FOUND));
    }
}
