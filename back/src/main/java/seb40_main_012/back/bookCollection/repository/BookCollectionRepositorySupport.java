package seb40_main_012.back.bookCollection.repository;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import seb40_main_012.back.bookCollection.dto.BookCollectionDto;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.entity.QBookCollection;

import java.util.List;

@Repository
public class BookCollectionRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;
    QBookCollection collection = QBookCollection.bookCollection;

    public BookCollectionRepositorySupport(JPAQueryFactory queryFactory) {
        super(BookCollection.class);
        this.queryFactory = queryFactory;
    }

    public Slice<BookCollection> findCollectionByNoOffset(Pageable pageable, Long lastStoreId){
        List<BookCollection> results =
                queryFactory.selectFrom(collection)
                        .where(
                                lstStoreId(lastStoreId) //no offset 페이징 처리
                                //기타 조건

                        )
                        .orderBy(collection.collectionId.desc())
                        .limit(pageable.getPageSize()+1)
                        .fetch();
        return checkLastPage(pageable,results); //무한 스크롤 처리
    }

    //no offset 처리
    public BooleanExpression lstStoreId(Long storeId) {
        if(storeId==null){
            return null;
        }
        return collection.collectionId.lt(storeId);
    }

    //무한 스크롤 방식 처리
    private Slice<BookCollection> checkLastPage(Pageable pageable,List<BookCollection> results){
        boolean hasNext = false;
        if (results.size() > pageable.getPageSize()) {
            hasNext = true;
            results.remove(pageable.getPageSize());
        }
        return new SliceImpl<>(results, pageable, hasNext);
    }

}
