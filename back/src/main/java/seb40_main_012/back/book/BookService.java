package seb40_main_012.back.book;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchController;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchDto;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchService;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.book.entity.Genre;
import seb40_main_012.back.bookCollection.repository.BookCollectionRepository;
import seb40_main_012.back.common.comment.CommentRepository;
import seb40_main_012.back.pairing.PairingRepository;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.service.UserService;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookService {

    private final BookInfoSearchController bookInfoSearchController;
    private final BookInfoSearchService bookInfoSearchService;
    private final BookRepository bookRepository;
    private final CommentRepository commentRepository;
    private final PairingRepository pairingRepository;
    private final BookCollectionRepository bookCollectionRepository;
    private final UserService userService;


    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    // 다대 다 매핑 준비
//    private final BookCollectionService bookCollectionService;
//
//    public Book createBook(Book book) {
//
//        List<BookCollectionBook> bookCollectionBooks = book.getBookCollectionBooks();
//
//        book.setBookCollectionBooks(bookCollectionBooks);
//
//        for (BookCollectionBook bookCollectionBook : bookCollectionBooks) {
//            bookCollectionBook.setBook(book);
//            long collectionBookId = bookCollectionBook.getBookCollection().getCollectionId();
////            bookCollectionService.findBookCollection(collectionBookId); // 컬렉션 비즈니스 로직 구현 후 추가
//        }
//
//        return bookRepository.save(book);
//    }
    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------

//    public Book createBook(Book book) {
//        return null;
//    }

    public Book createBook(Book book) {

        User findUser = userService.getLoginUser();

        String categoryName = bookInfoSearchService.bookSearch(book.getIsbn13()).getItem().get(0).categoryName;

        Book savedBook =
                Book.builder()
                        .isbn13(book.getIsbn13())
                        .averageRating(book.getAverageRating())
                        .build();

        if (categoryName.matches(".*소설/시/희곡>.*소설")) savedBook.setGenre(Genre.NOVEL);
        else if (categoryName.matches(".*에세이>.*에세이")) savedBook.setGenre(Genre.ESSAY);
        else if (categoryName.matches(".*소설/시/희곡>.*시")) savedBook.setGenre(Genre.POEM);
        else if (categoryName.matches(".*예술/대중문화>.*")) savedBook.setGenre(Genre.ART);
        else if (categoryName.matches(".*>인문학>.*")) savedBook.setGenre(Genre.HUMANITIES);
        else if (categoryName.matches(".*>사회과학>.*")) savedBook.setGenre(Genre.SOCIAL);
        else if (categoryName.matches(".*>과학>.*")) savedBook.setGenre(Genre.NATURAL);
        else if (categoryName.matches(".*>만화>.*")) savedBook.setGenre(Genre.COMICS);
        else savedBook.setGenre(Genre.ETC);

        return bookRepository.save(savedBook);
    }

    public Book updateBook(Book book) {
        return null;
    }

    public Book updateView(String isbn13) {

        Optional<Book> optionalBook = bookRepository.findByIsbn13(isbn13);

        if (optionalBook.isEmpty()) {

            BookInfoSearchDto.BookInfo.Item bookItem = bookInfoSearchService.bookSearch(isbn13).getItem().get(0);

            LinkedHashMap map = (LinkedHashMap<String ,String>)bookItem.subInfo;

            String categoryName = bookItem.categoryName;

            Genre genre = null;

            if (categoryName.matches(".*소설/시/희곡>.*소설")) genre = Genre.NOVEL;
            else if (categoryName.matches(".*에세이>.*에세이")) genre = Genre.ESSAY;
            else if (categoryName.matches(".*소설/시/희곡>.*시")) genre = Genre.POEM;
            else if (categoryName.matches(".*예술/대중문화>.*")) genre = Genre.ART;
            else if (categoryName.matches(".*>인문학>.*")) genre = Genre.HUMANITIES;
            else if (categoryName.matches(".*>사회과학>.*")) genre = Genre.SOCIAL;
            else if (categoryName.matches(".*>과학>.*")) genre = Genre.NATURAL;
            else if (categoryName.matches(".*>만화>.*")) genre = Genre.COMICS;
            else genre = Genre.ETC;

            Book savedBook =
                    Book.builder()
                            .isbn13(isbn13)
                            .cover(bookItem.cover)
                            .title(bookItem.title)
                            .subTitle(map.get("subTitle").toString())
                            .itemPage(map.get("itemPage").toString())
                            .author(bookItem.author)
                            .pubDate(bookItem.pubDate)
                            .genre(genre)
                            .adult(bookItem.adult)
                            .description(bookItem.description)
                            .view(1)
                            .build();



            System.out.println(map.get("itemPage"));
            
            return bookRepository.save(savedBook);

        } else {

            Book findBook = optionalBook.get();

            long commentCount = findBook.getComments().size();

            long pairingCount = findBook.getPairings().size();

            long bookCollectionCount = findBook.getBookCollections().size();

            findBook.setView(findBook.getView() + 1); // 별점 업데이트
            findBook.setCommentCount(commentCount);
            findBook.setPairingCount(pairingCount);
            findBook.setBookCollectionCount(bookCollectionCount);

            return bookRepository.save(findBook);
        }
    }

//    public Book updateRating(BookDto.Rating ratingBook, String isbn13) {
//
//        User findUser = userService.getLoginUser();
//
//        double rating = ratingBook.getRating(); // 입력받은 별점
//
//        Book findBook = findVerifiedBook(isbn13);
//
//        double averageRating = findBook.getAverageRating(); // 현재 평균 별점
//        long ratingCount = findBook.getRatingCount(); // 현재 별점 개수
//
//        double numerator = (averageRating * ratingCount) + rating; // 분자
//        long denominator = ratingCount + 1; // 분모
//
//        double newAverageRating = Math.round((numerator / denominator) * 100) / 100.0; // 업데이트된 별점 -> 소수점 둘째 자리까지 표시
//
//        findBook.setAverageRating(newAverageRating); // 별점 업데이트
//
//        return bookRepository.save(findBook);

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
//            savedBook.setAverageRating(rating);
//
//            return bookRepository.save(savedBook);
//
//        } else {
//
//            Book findBook = optionalBook.get();
//
//            double averageRating = findBook.getAverageRating(); // 현재 평균 별점
//            long ratingCount = findBook.getRatingCount(); // 현재 별점 개수
//
//            double numerator = (averageRating * ratingCount) + rating; // 분자
//            long denominator = ratingCount + 1; // 분모
//
//            double newAverageRating = Math.round((numerator / denominator) * 100) / 100.0; // 업데이트된 별점 -> 소수점 둘째 자리까지 표시
//
//            findBook.setAverageRating(newAverageRating); // 별점 업데이트
//
//            return bookRepository.save(findBook);
//        }
//    }

    public Book findBook(String isbn13) {
        return findVerifiedBook(isbn13);
    }

    public Page<Book> findBooks(int page, int size) {
        return null;
    }

    public List<Book> findCarouselBooks() {
        return bookRepository.findCarouselBooks();
    }

    public List<Book> findBestBooks() {
        return bookRepository.findBestBooks();
    }

    public List<Book> findRecommendedBooks() {

        User findUser = userService.getLoginUser();

        String favoriteGenre = findUser.getCategories().get(0).getCategory().getGenre().toString();

        return bookRepository.findRecommendedBooks(favoriteGenre);
    }

    public void deleteBook(long bookId) {
    }

    public void verifyBook(long userId, Book book) {
    }

    public Book findVerifiedBook(String isbn13) {
//        Optional<Book> optionalBook = bookRepository.findById(bookId);
        Optional<Book> optionalBook = bookRepository.findByIsbn13(isbn13);
        return optionalBook.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOOK_NOT_FOUND));
    }
}
