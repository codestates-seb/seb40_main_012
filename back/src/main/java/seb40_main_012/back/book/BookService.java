package seb40_main_012.back.book;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
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
import seb40_main_012.back.common.comment.CommentService;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.pairing.PairingRepository;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.service.UserService;

import java.util.*;
import java.util.stream.Collectors;

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

            LinkedHashMap map = (LinkedHashMap<String, String>) bookItem.subInfo;

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
                            .publisher(bookItem.publisher)
                            .genre(genre)
                            .adult(bookItem.adult)
                            .description(bookItem.description.replace("&lt;", "<")
                                    .replace("&gt;", ">"))
                            .view(1)
                            .build();


            System.out.println(map.get("itemPage"));

            return bookRepository.save(savedBook);

        } else {

            Book findBook = optionalBook.get();



//            if (Objects.equals(SecurityContextHolder.getContext().getAuthentication().getName(), "anonymousUser")) {
//                myComment = null;
//            }
//            if (!Objects.equals(SecurityContextHolder.getContext().getAuthentication().getName(), "anonymousUser")){
//                myComment = commentRepository.findMyBookCommentByIsbn13AndEmail(isbn13).stream()
//                        .filter(comment -> comment.getUser().getEmail() == "spring_sunshine@email.com")
//                        .findFirst().get();
////                myComment = commentRepository.findMyBookCommentByIsbn13AndEmail(isbn13, SecurityContextHolder.getContext().getAuthentication().getName().toString());
//            }
//
//            System.out.println("------------------------------------------");
//            System.out.println("------------------------------------------");
//            System.out.println("------------------------------------------");
//            System.out.println("------------------------------------------");
//            System.out.println(commentRepository.findMyBookCommentByIsbn13AndEmail(isbn13).stream()
//                    .filter(comment -> comment.getUser().getEmail() == "spring_sunshine@email.com").findFirst());
//            System.out.println("------------------------------------------");
//            System.out.println("------------------------------------------");
//            System.out.println("------------------------------------------");
//            System.out.println("------------------------------------------");

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

        // 유저 선호 장르 리스트로 받기
        List<String> genreList = findUser.getCategories().stream()
                .map(userCategory -> userCategory.getCategory().getGenre().toString())
                .collect(Collectors.toList());

        // 각각 5권씩 조회수대로 불러온 후 다시 조회수 순으로 5권 정렬 후 반환
        return genreList.stream()
                .map(bookRepository::findRecommendedBooks)
                .flatMap(Collection::stream)
                .sorted(Comparator.comparing(Book::getView).reversed())
                .limit(5)
                .collect(Collectors.toList());
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
