package seb40_main_012.back.bookWiki;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.pairing.entity.Pairing;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookWikiService {

    private final BookWikiRepository bookWikiRepository;

    public BookWiki createBookWiki(BookWiki bookWiki){

//        User findUser = userService.findUser(userId);

        return bookWikiRepository.save(bookWiki);
    }

    public BookWiki updateBookWiki(BookWiki bookWiki, long bookWikiId){ // 로그인한 사용자면 누구나 수정 가능

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

    public BookWiki updateView(long bookWikiId){

        BookWiki findBookWiki = findVerifiedBookWiki(bookWikiId);

        findBookWiki.setView(findBookWiki.getView() + 1); // View +1

        return bookWikiRepository.save(findBookWiki);
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

    public void verifyUser(long userId) {
    }
    
}
