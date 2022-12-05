package seb40_main_012.back.bookCollection.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.book.BookRepository;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.book.BookSpecification;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.book.entity.Genre;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.entity.BookCollectionLike;
import seb40_main_012.back.bookCollection.entity.BookCollectionTag;
import seb40_main_012.back.bookCollection.entity.Tag;
import seb40_main_012.back.bookCollection.repository.*;
import seb40_main_012.back.bookCollectionBook.BookCollectionBook;
import seb40_main_012.back.bookCollectionBook.BookCollectionBookRepository;
import seb40_main_012.back.common.bookmark.Bookmark;
import seb40_main_012.back.common.bookmark.BookmarkRepository;
import seb40_main_012.back.notification.NotificationService;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.entity.UserCategory;
import seb40_main_012.back.user.repository.CategoryRepository;
import seb40_main_012.back.user.repository.UserCategoryRepository;
import seb40_main_012.back.user.service.UserService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class BookCollectionService {
    private final UserService userService;
    private final BookService bookService;
    private final BookCollectionRepository collectionRepository;
    private final BookCollectionTagRepository collectionTagRepository;
    private final BookCollectionLikeRepository collectionLikeRepository;
    private final BookmarkRepository bookmarkRepository;
    private final BookCollectionBookRepository collectionBookRepository;
    private final BookRepository bookRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final BookCollectionRepositorySupport collectionRepositorySupport;
    private final NotificationService noticeService;

    public BookCollection postCollection(BookCollection collection, List<String> tags) {
        User findUser = userService.getLoginUser();
        collection.setCollectionTag();

        if (tags.size() == 0) {
            findUser.addBookCollection(collection);
            collection.addUser(findUser);
        }

        tags.forEach(
                x -> {
                    if (tagRepository.findByTagName(x).isEmpty()) {
                        Tag newTag = new Tag(x);
                        tagRepository.save(newTag);
                        BookCollectionTag collectionTag = new BookCollectionTag(collection, newTag);
                        collectionRepository.save(collection);
                        collectionTagRepository.save(collectionTag);
                        collection.addCollectionTag(collectionTag);
                        findUser.addBookCollection(collection);
                        collection.addUser(findUser);
                    } else {
                        Tag tag = tagRepository.findByTagName(x).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));
                        BookCollectionTag collectionTag = new BookCollectionTag(collection, tag);
                        collectionRepository.save(collection);
                        collectionTagRepository.save(collectionTag);
                        collection.addCollectionTag(collectionTag);
                        findUser.addBookCollection(collection);
                        collection.addUser(findUser);
                    }

                }
        );
        List<String> isbn = collection.getBookIsbn13();
        isbn.forEach(
                x -> {
                    Book newBook = bookService.updateView(x);
                    BookCollectionBook findCollectionBook = new BookCollectionBook(newBook, collection);
                    collectionBookRepository.save(findCollectionBook);
                    collection.addCollectionBook(findCollectionBook);
                }
        );

        return collection;
    }

    public BookCollection patchCollection(Long collectionId, BookCollection collection, List<String> tags) {
        User findUser = userService.getLoginUser();
        Long userId = findUser.getUserId();

        BookCollection bookCollection = findVerifiedCollection(collectionId);
        bookCollection.editCollection(collection);
        collectionTagRepository.deleteAllByBookCollection(bookCollection);
        collectionBookRepository.deleteAllByBookCollection(bookCollection);


        if (tags.size() == 0) {
            findUser.addBookCollection(bookCollection);
        }

        tags.forEach(
                x -> {
                    if (tagRepository.findByTagName(x).isEmpty()) {
                        Tag newTag = new Tag(x);
                        tagRepository.save(newTag);
                        BookCollectionTag collectionTag = new BookCollectionTag(bookCollection, newTag);
                        collectionRepository.save(bookCollection);
                        collectionTagRepository.save(collectionTag);
                        bookCollection.addCollectionTag(collectionTag);
                        findUser.addBookCollection(bookCollection);
//                        bookCollection.addUser(findUser);
                    } else {
                        Tag tag = tagRepository.findByTagName(x).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));
                        BookCollectionTag collectionTag = new BookCollectionTag(bookCollection, tag);
                        collectionRepository.save(bookCollection);
                        collectionTagRepository.save(collectionTag);
                        bookCollection.addCollectionTag(collectionTag);
                        findUser.addBookCollection(bookCollection);
//                        collection.addUser(findUser);
                    }
                }
        );

        List<String> isbn = bookCollection.getBookIsbn13();
        isbn.forEach(
                x -> {
                    Book newBook = bookService.updateView(x);
                    BookCollectionBook findCollectionBook = new BookCollectionBook(newBook, bookCollection);
                    collectionBookRepository.save(findCollectionBook);
                    bookCollection.addCollectionBook(findCollectionBook);
                }
        );
        return bookCollection;
    }


    //상세 조회 -> ISBN13 으로 db에서 책 별점 조회,없으면 알라딘 api에서 책 정보만 조회
    public BookCollection getCollection(Long collectionId) {
        BookCollection findBookCollection = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COLLECTION_NOT_FOUND));

        if (!SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser")) {
            isUserLike(collectionId);
            isUserBookmark(collectionId);
            isUserCollection(collectionId);
        }

        findBookCollection.setView(findBookCollection.getView() + 1);

        return findBookCollection;
    }

    public boolean likeCollection(Long collectionId) {
        User findUser = userService.getLoginUser();
        Long userId = findUser.getUserId();

        BookCollection findCollection = findVerifiedCollection(collectionId);
        Long count = collectionLikeRepository.count();
        BookCollectionLike collectionLike = collectionLikeRepository.findByUserUserIdAndBookCollectionCollectionId(userId, collectionId);
        try {
            if (collectionLike != null) {
                collectionLikeRepository.delete(collectionLike);
                count -= 1L;
                findCollection.setLikeCount(count);
            } else {
                BookCollectionLike bookCollectionLike = new BookCollectionLike(findUser, findCollection);
                collectionLikeRepository.save(bookCollectionLike);
                findUser.addCollectionLike(bookCollectionLike);
                findCollection.addCollectionLike(bookCollectionLike); //순환참조
                count += 1L;
                findCollection.setLikeCount(count);
            }

            return true;
        } catch (BusinessLogicException e) {
            throw new BusinessLogicException(ExceptionCode.FAIL_TO_LIKE);
        }
    }

    public void deleteCollection(Long collectionId) {
        User findUser = userService.getLoginUser();

        Long userId = findUser.getUserId();

        collectionRepository.deleteById(collectionId);
    }

    public void isUserLike(Long collectionId) {
        User findUser = userService.getLoginUser();
        BookCollection bookCollection = findVerifiedCollection(collectionId);
        if (collectionLikeRepository.findByUserUserIdAndBookCollectionCollectionId(findUser.getUserId(), collectionId) == null)
            bookCollection.setUserLike(false);
        else bookCollection.setUserLike(true);
    }

    public void isUserBookmark(Long collectionId) {
        User findUser = userService.getLoginUser();
        BookCollection bookCollection = findVerifiedCollection(collectionId);
        if (bookmarkRepository.findByUserAndBookCollection(findUser, bookCollection) == null)
            bookCollection.setUserBookmark(false);
        else bookCollection.setUserBookmark(true);
    }

    public void isUserCollection(Long collectionId) {
        User findUser = userService.getLoginUser();
        BookCollection bookCollection = findVerifiedCollection(collectionId);
        User collectionUser = bookCollection.getUser();

        if (findUser.getUserId() == collectionUser.getUserId())
            bookCollection.setUserCollection(true);
        else bookCollection.setUserCollection(false);
    }

    //================================================ 컬렉션 메인 ================================================

    public List<BookCollection> findUserCollection() {
        User findUser = userService.getLoginUser();
        return collectionRepository.findByUserUserId(findUser.getUserId());
    }

    public List<BookCollection> findBestCollection() {
        return collectionRepositorySupport.findBestCollection();
    }

//    public List<BookCollection> findUserFitCollection() {
//        return collectionRepositorySupport.findUserFitCollection();
//    }


    public List<BookCollection> findCollectionByUserCategory() {
        String genre = "";
        User findUser = userService.getLoginUser();
        List<Genre> genres = findUser.getCategories().stream().map(x -> x.getCategory().getGenre()).collect(Collectors.toList());
        List<Genre> rdmGenres = new ArrayList<>(List.of(Genre.ESSAY,Genre.NOVEL,Genre.ETC));
        Collections.shuffle(genres);
        Collections.shuffle(rdmGenres);

        if(genres.isEmpty()){
            genre = rdmGenres.get(0).name();
        }else genre = genres.get(0).name();


        List<BookCollectionBook> collectionBooks = collectionRepositorySupport.findCollectionBook(genre);
        List<BookCollection> collections = collectionBooks.stream().map(x -> x.getBookCollection()).distinct().collect(Collectors.toList());
        return collections;
    }

    public List<BookCollection> findCollectionByCollectionTag() {
        String tagName = "겨울";
        Tag tag = tagRepository.findByTagName(tagName).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));
        List<BookCollectionTag> collectionTag = collectionTagRepository.findByTag(tag);
        List<BookCollection> collections = collectionTag.stream().map(BookCollectionTag::getBookCollection).collect(Collectors.toList());
        return collections;
    }


    public BookCollection findCollectionByAuthor() {
//        String author = "양귀자 (지은이)";
//        String title = "양귀자 모음";
//        String content = "";
//
//        List<Book> books = bookRepository.findWritersBooks(author);
//
//        List<BookCollectionBook> collectionBooks = new ArrayList<>();
//        books.forEach(
//                x -> {
//                    BookCollectionBook collectionBook  = BookCollectionBook.builder().book(x).build();
//                    collectionBookRepository.save(collectionBook);
//                    collectionBooks.add(collectionBook);
//                }
//        );
//        BookCollection collection = BookCollection.builder()
//                .collectionId(30L)
//                .title(title)
//                .content(content)
//                .collectionBooks(collectionBooks)
//                .build();
//        return collectionRepository.save(collection);
        return findVerifiedCollection(108L);
    }

    public BookCollection findCollectionByCritic() {
        return findVerifiedCollection(107L);

    }

    // 컬렉션 작성용 북마크 책 조회 api
    public List<Book> getBookmarkByBook() {
        User findUser = userService.getLoginUser();
        List<Bookmark> allBookmarks = bookmarkRepository.findByUser(findUser);
        List<Bookmark> bookmarks = new ArrayList<>();
        allBookmarks.forEach(
                x -> {
                    if (x.getBook() != null) bookmarks.add(x);
                }
        );
        List<Book> books = bookmarks.stream().map(x -> x.getBook()).collect(Collectors.toList());
        return books;
    }

    public List<BookCollection> getAllCollectionsForTheBook(String isbn13) {

        List<BookCollection> result = collectionRepository.findAllCollectionsForTheBook(isbn13);

//        List<String> coverResult = result.stream()
//                .map(BookCollection::getBookIsbn13)
//                .flatMap(Collection::stream)
//                .map(a -> bookService.findBook(a).getCover())
//                .limit(4)
//                .collect(Collectors.toList());
        if (result != null) {
            for (int i = 0; i < result.size(); i++) {
                result.get(i).setCollectionCover(
                        result.get(i).getBookIsbn13().stream()
                                .map(a -> bookService.findBook(a).getCover())
                                .limit(4)
                                .collect(Collectors.toList()));
            }
        }

        return result;
    }

    public List<BookCollection> findCollectionByUserCategory2() {
        User loginUser = userService.getLoginUser();
        List<UserCategory> userCategory = userCategoryRepository.findAllByUser(loginUser);
        List<Genre> genres = userCategory.stream()
                .map(userCate -> userCate.getCategory().getGenre())
                .collect(Collectors.toList());

        Specification<Book> bookSpec = null;
        for (Genre genre : genres) {
            Specification<Book> bookSpecWithGenre = BookSpecification.findBookByGenre(genre);
            bookSpec = (bookSpec == null) ? bookSpecWithGenre : bookSpec.or(bookSpecWithGenre);
        }
        bookSpec.and(BookSpecification.isPresentCollection());
        List<Book> books = bookRepository.findAll(bookSpec);

        List<BookCollection> bookCollections = new ArrayList<>();
        for (Book book : books) {
            bookCollections.addAll(collectionBookRepository.findAllByBook(book).stream()
                    .map(bookCollectionBook -> bookCollectionBook.getBookCollection())
                    .filter(bcb -> !bookCollections.contains(bcb))
                    .collect(Collectors.toList()));
        }

        return bookCollections;
    }

    public BookCollection findVerifiedCollection(Long collectionId) {
        BookCollection collection = collectionRepository.findById(collectionId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COLLECTION_NOT_FOUND));
        return collection;
    }

}
