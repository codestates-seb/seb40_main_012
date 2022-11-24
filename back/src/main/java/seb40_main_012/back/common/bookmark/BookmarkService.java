package seb40_main_012.back.common.bookmark;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.service.BookCollectionService;
import seb40_main_012.back.pairing.PairingService;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.service.UserService;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookmarkService {
    private final UserService userService;
    private final BookCollectionService collectionService;
    private final PairingService pairingService;
    private final BookService bookService;
    private final BookmarkRepository bookmarkRepository;


    public boolean bookmarkCollection(Long collectionId){
        User findUser = userService.getLoginUser();

        Long userId = findUser.getUserId();

        BookCollection collection = collectionService.findVerifiedCollection(collectionId);
        Bookmark findBookmark = bookmarkRepository.findByUserAndBookCollection(findUser,collection);


        try{
            if(findBookmark!=null){
                bookmarkRepository.delete(findBookmark);
            }else {
                Bookmark bookmark = Bookmark.builder()
                        .bookmarkType(BookmarkType.COLLECTION)
                        .bookCollection(collection)
                        .user(findUser)
                        .build();
                bookmarkRepository.save(bookmark);
            }
        }
        catch (BusinessLogicException e) {throw new BusinessLogicException(ExceptionCode.FAIL_TO_BOOKMARK);}
        return true;
    }

    public boolean bookmarkPairing(Long pairingId){
        User findUser = userService.getLoginUser();
        Pairing pairing = pairingService.findVerifiedPairing(pairingId);
        Bookmark findBookmark = bookmarkRepository.findByUserAndPairing(findUser,pairing);


        try{
            if(findBookmark!=null){
                bookmarkRepository.delete(findBookmark);
            }else {
                Bookmark bookmark = Bookmark.builder()
                        .bookmarkType(BookmarkType.PAIRING)
                        .pairing(pairing)
                        .user(findUser)
                        .build();
                bookmarkRepository.save(bookmark);
            }
        }
        catch (BusinessLogicException e) {throw new BusinessLogicException(ExceptionCode.FAIL_TO_BOOKMARK);}
        pairingService.isBookMarkedPairing(pairing);
        return true;
    }

    public boolean bookmarkBook(String bookIsbn13){
        User findUser = userService.getLoginUser();
        Book book = bookService.findVerifiedBook(bookIsbn13);
        Bookmark findBookmark = bookmarkRepository.findByUserAndBook(findUser,book);


        try{
            if(findBookmark!=null){
                bookmarkRepository.delete(findBookmark);
            }else {
                Bookmark bookmark = Bookmark.builder()
                        .bookmarkType(BookmarkType.BOOK)
                        .book(book)
                        .user(findUser)
                        .build();
                bookmarkRepository.save(bookmark);
            }
        }
        catch (BusinessLogicException e) {throw new BusinessLogicException(ExceptionCode.FAIL_TO_BOOKMARK);}
        return true;
    }

}
