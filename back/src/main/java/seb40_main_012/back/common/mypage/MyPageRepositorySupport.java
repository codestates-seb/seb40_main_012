package seb40_main_012.back.common.mypage;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import seb40_main_012.back.book.entity.QBook;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.entity.QBookCollection;
import seb40_main_012.back.common.bookmark.Bookmark;
import seb40_main_012.back.common.bookmark.BookmarkType;
import seb40_main_012.back.common.bookmark.QBookmark;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.pairing.entity.QPairing;

import java.util.List;

@Repository
public class MyPageRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;
    QBookCollection collection = QBookCollection.bookCollection;
    QPairing pairing = QPairing.pairing;
    QBookmark bookmark = QBookmark.bookmark;

    public MyPageRepositorySupport(JPAQueryFactory queryFactory) {
        super(BookCollection.class);
        this.queryFactory = queryFactory;
    }

    //*test
    public Slice<BookCollection> findCollectionByNoOffset(Pageable pageable, Long lastStoreId){
        List<BookCollection> results =
                queryFactory.selectFrom(collection)
                        .where(
                                lstStoreIdOfCollection(lastStoreId) //no offset 페이징 처리
                                //기타 조건
                        )
                        .orderBy(collection.collectionId.desc())
                        .limit(pageable.getPageSize()+1)
                        .fetch();
        return checkLastPage(pageable,results); //무한 스크롤 처리
    }

    public Slice<BookCollection> findUserCollection(Pageable pageable, Long lastStoreId, Long userId){
        List<BookCollection> results =
                queryFactory.selectFrom(collection)
                        .where(
                                lstStoreIdOfCollection(lastStoreId),
                                collection.user.userId.eq(userId)
                        )
                        .orderBy(collection.collectionId.desc())
                        .limit(pageable.getPageSize()+1)
                        .fetch();
        return checkLastPage(pageable, results);
    }


    public Slice<Pairing> findUserPairing(Pageable pageable, Long lastStoreId, Long userId){
        List<Pairing> results =
                queryFactory.selectFrom(pairing)
                        .where(
                                lstStoreIdOfPairing(lastStoreId),
                                pairing.user.userId.eq(userId)
                        )
                        .orderBy(pairing.pairingId.desc())
                        .limit(pageable.getPageSize()+1)
                        .fetch();
        return checkLastPage(pageable, results);
    }

    public Slice<Bookmark> findBookmarkCollection(Pageable pageable, Long lastStoreId, Long userId){
        List<Bookmark> results =
                queryFactory.selectFrom(bookmark)
                        .where(
                                lstStoreIdOfBookmark(lastStoreId),
                                bookmark.user.userId.eq(userId)
                                        .and(bookmark.bookmarkType.eq(BookmarkType.COLLECTION))
                        )
                        .orderBy(bookmark.bookmarkId.desc())
                        .limit(pageable.getPageSize()+1)
                        .fetch();
        return checkLastPage(pageable, results);
    }

    public Slice<Bookmark> findBookmarkPairing(Pageable pageable, Long lastStoreId, Long userId){
        List<Bookmark> results =
                queryFactory.selectFrom(bookmark)
                        .where(
                                lstStoreIdOfBookmark(lastStoreId),
                                bookmark.user.userId.eq(userId)
                                        .and(bookmark.bookmarkType.eq(BookmarkType.PAIRING))
                        )
                        .orderBy(bookmark.bookmarkId.desc())
                        .limit(pageable.getPageSize()+1)
                        .fetch();
        return checkLastPage(pageable, results);
    }

    public Slice<Bookmark> findBookmarkBook(Pageable pageable, Long lastStoreId, Long userId){
        List<Bookmark> results =
                queryFactory.selectFrom(bookmark)
                        .where(
                                lstStoreIdOfBookmark(lastStoreId),
                                bookmark.user.userId.eq(userId)
                                        .and(bookmark.bookmarkType.eq(BookmarkType.BOOK))
                        )
                        .orderBy(bookmark.bookmarkId.desc())
                        .limit(pageable.getPageSize()+1)
                        .fetch();
        return checkLastPage(pageable, results);
    }



    //======================================= 무한 스크롤 ==========================================
    //no offset 처리
    public BooleanExpression lstStoreIdOfCollection(Long storeId) {
        if(storeId==null){
            return null;
        }
        return collection.collectionId.lt(storeId);
    }
    public BooleanExpression lstStoreIdOfPairing(Long storeId) {
        if(storeId==null){
            return null;
        }
        return pairing.pairingId.lt(storeId);
    }
    public BooleanExpression lstStoreIdOfBookmark(Long storeId) {
        if(storeId==null){
            return null;
        }
        return bookmark.bookmarkId.lt(storeId);
    }

    //무한 스크롤 방식 처리
    private Slice checkLastPage(Pageable pageable,List<?> results){
        boolean hasNext = false;
        if (results.size() > pageable.getPageSize()) {
            hasNext = true;
            results.remove(pageable.getPageSize());
        }
        return new SliceImpl<>(results, pageable, hasNext);
    }

}
