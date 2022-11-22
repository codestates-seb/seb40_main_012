package seb40_main_012.back.bookCollection.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.book.BookRepository;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.book.entity.Genre;
import seb40_main_012.back.bookCollection.entity.*;
import seb40_main_012.back.bookCollection.repository.*;
import seb40_main_012.back.common.bookmark.Bookmark;
import seb40_main_012.back.common.bookmark.BookmarkRepository;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.repository.CategoryRepository;
import seb40_main_012.back.user.repository.UserCategoryRepository;
import seb40_main_012.back.user.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookCollectionService {
    private final UserService userService;
    private final BookService bookService;
    private final BookCollectionRepository collectionRepository;
    private final BookCollectionTagRepository collectionTagRepository;
    private final BookCollectionLikeRepository collectionLikeRepository;
    private final BookmarkRepository collectionBookmarkRepository;
    private final BookRepository bookRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;

    public BookCollection postCollection(Long userId, BookCollection collection, List<String> tags){
        User findUser = userService.findVerifiedUser(userId);
        collection.setCollectionTag();


        tags.forEach(
                x -> {
                    Tag newTag = new Tag(x);
                    tagRepository.save(newTag);
                    BookCollectionTag collectionTag = new BookCollectionTag(collection,newTag);
                    collectionRepository.save(collection);
                    collectionTagRepository.save(collectionTag);
                    collection.addCollectionTag(collectionTag);
                    findUser.addBookCollection(collection);
                    collection.addUser(findUser);
                }
        );
        return collection;
    }

    public BookCollection patchCollection(Long userId, Long collectionId,BookCollection collection, List<String> tags){
        User findUser = userService.findVerifiedUser(userId);
        BookCollection bookCollection = findVerifiedCollection(collectionId);
//        collection.setCollectionTag();

        tags.forEach(
                x -> {
                    Tag newTag = new Tag(x);
                    tagRepository.save(newTag);
                    BookCollectionTag collectionTag = new BookCollectionTag(bookCollection,newTag);
                    collectionRepository.save(bookCollection);
                    collectionTagRepository.save(collectionTag);
                    bookCollection.addCollectionTag(collectionTag);
                    bookCollection.editCollection(collection);
                    findUser.addBookCollection(bookCollection);
                    bookCollection.addUser(findUser);
                }
        );
        return bookCollection;
    }




    //상세 조회 -> ISBN13 으로 db에서 책 별점 조회,없으면 알라딘 api에서 책 정보만 조회
    public BookCollection getCollection(Long collectionId) {


        return collectionRepository.findById(collectionId)
                .orElseThrow( () -> new BusinessLogicException(ExceptionCode.COLLECTION_NOT_FOUND));
    }

    public boolean likeCollection(Long userId,Long collectionId){
        User findUser = userService.findVerifiedUser(userId);
        BookCollection findCollection = findVerifiedCollection(collectionId);
        Long count = collectionLikeRepository.count();
        BookCollectionLike collectionLike = collectionLikeRepository.findByUserUserIdAndBookCollectionCollectionId(userId,collectionId);
        try{
            if(collectionLike!=null){
                collectionLikeRepository.delete(collectionLike);
                count -=1L;
            }
            else {
                BookCollectionLike bookCollectionLike = new BookCollectionLike(findUser,findCollection);    //repo 저장 왜 안해도 돼?
                findUser.addCollectionLike(bookCollectionLike);
                count +=1L;
            }
            findCollection.setLikeCount(count);
            return true;
        }
        catch (BusinessLogicException e) {throw new BusinessLogicException(ExceptionCode.FAIL_TO_LIKE);}
    }

    public void deleteCollection(Long collectionId){
        collectionRepository.deleteById(collectionId);
    }


    public BookCollection findVerifiedCollection(Long collectionId) {
        BookCollection collection = collectionRepository.findById(collectionId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.COLLECTION_NOT_FOUND));
        return collection;
    }

    public List<BookCollection> findCollectionByUserCategory(Long userId){
        String userCategory = Genre.ART.name();
//        Category category = categoryRepository.findByGenre(Genre.ART);

        Tag tag = tagRepository.findByTagName(userCategory).orElseThrow(()-> new BusinessLogicException(ExceptionCode.NOT_FOUND));
        List<BookCollectionTag> collectionTag = collectionTagRepository.findByTag(tag);
        List<BookCollection> collections = collectionTag.stream().map(BookCollectionTag::getBookCollection).collect(Collectors.toList());
        return collections;
    }

    public List<BookCollection> findCollectionByCollectionTag(){
        String tagName = "겨울";
        Tag tag = tagRepository.findByTagName(tagName).orElseThrow(()-> new BusinessLogicException(ExceptionCode.NOT_FOUND));
        List<BookCollectionTag> collectionTag = collectionTagRepository.findByTag(tag);
        List<BookCollection> collections = collectionTag.stream().map(BookCollectionTag::getBookCollection).collect(Collectors.toList());

//        //tagId 로 해당 id가진 collectionTag의 collectionId 조회
//        List<Tag> tags = List.of(new Tag("겨울"),new Tag("쓸쓸한"));
//        List<Long> tagId = tags.stream().map(x -> x.getTagId()).collect(Collectors.toList());
////        List<Long> tagId = List.of(1L, 2L);
//        tagId.forEach(
//               x -> collectionTagRepository.findByTagTagId(x)
//        );
//        List<BookCollectionTag> collectionTag = collectionTagRepository.findByTagTagId(tagId.get(0));
//        List<Long> collectionTagId = collectionTag.stream().map(x -> x.getBookCollectionTagId()).collect(Collectors.toList());
//        List<BookCollection> collections = collectionTagId.stream().map(e -> collectionRepository.findById(e).orElseThrow(()->new BusinessLogicException(ExceptionCode.NOT_FOUND))).collect(Collectors.toList());

        return collections;
    }

    public BookCollection findCollectionByAuthor(){
        String author = "양귀자";
        String title = "양귀자 모음";
        String content = "";

        //1. 저자 이름으로 책 조회 > 해당 책이 포함된 컬렉션 조회(isbn 로 조회)
        List<Book> books = bookRepository.findWritersBooks(author);
        List<String> isbns = books.stream().map(e -> e.getIsbn13()).collect(Collectors.toList());
        return new BookCollection(title,content,isbns);
    }


    public List<Book> findBooks(List<String> isbn){
        List<Book> findBooks = new ArrayList<>();
        isbn.forEach(
                x -> {
                    findBooks.add(bookService.findBook(x));
                    //save()
                }
        );
        return findBooks;
    }


}
