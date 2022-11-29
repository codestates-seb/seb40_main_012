package seb40_main_012.back.bookCollection.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.entity.QBookCollection;

import java.util.List;

@Repository
public class BookCollectionRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;
    QBookCollection bookCollection = QBookCollection.bookCollection;

    public BookCollectionRepositorySupport(JPAQueryFactory queryFactory) {
        super(BookCollection.class);    //설정 domain 클래스로 하면 왜 di 안되나
        this.queryFactory = queryFactory;
    }


    public List<BookCollection> findBestCollection(){
        List<BookCollection> collections =
                queryFactory.selectFrom(bookCollection)
                        .where()
                        .orderBy(bookCollection.likeCount.desc())
                        .orderBy(bookCollection.view.desc())
                        .fetch();
        return collections;
    }

}
