package seb40_main_012.back.bookCollection.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.entity.QBookCollection;
import seb40_main_012.back.bookCollectionBook.BookCollectionBook;
import seb40_main_012.back.bookCollectionBook.QBookCollectionBook;
import seb40_main_012.back.user.entity.QUser;

import java.util.List;

@Repository
public class BookCollectionRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;
    QBookCollection bookCollection = QBookCollection.bookCollection;
    QBookCollectionBook collectionBook = QBookCollectionBook.bookCollectionBook;
    QUser user = QUser.user;

    public BookCollectionRepositorySupport(JPAQueryFactory queryFactory) {
        super(BookCollection.class);    //설정 domain 클래스로 하면 왜 di 안되
        this.queryFactory = queryFactory;
    }


    public List<BookCollection> findBestCollection(){
        List<BookCollection> collections =
                queryFactory.selectFrom(bookCollection)
                        .where()
                        .orderBy(bookCollection.likeCount.desc())
                        .orderBy(bookCollection.view.desc())
                        .limit(12)
                        .fetch();
        return collections;
    }

    //2. 해당 컬렉션 북의 컬렉션 아이디 조회
    public List<BookCollection> findUserFitCollection(){
        List<BookCollection> collections =
                queryFactory.select(bookCollection)
                        .from(bookCollection)
                        .leftJoin(bookCollection.collectionBooks,collectionBook).fetchJoin()
                        .where(
                                bookCollection.collectionBooks.contains(collectionBook)
                        )
                        .fetch();
        return collections;
    }

    //1. 장르 책 가진 컬렉션 북 조회
    public List<BookCollectionBook> findCollectionBook(String genre){
        List<BookCollectionBook> collections =
                queryFactory.selectFrom(collectionBook)
                        .where(collectionBook.book.genre.stringValue().eq(genre))
                        .orderBy(bookCollection.likeCount.desc())
                        .orderBy(bookCollection.view.desc())
                        .fetch();
        return collections;
    }


    private BooleanExpression genre(String genre){
        return null;
    }

    //유저 장르 조회(랜덤으로 하나) > 해당 장르의 책 조회 > 책 > 컬렉션에 매핑된 컬렉션 책 > 책 장르

//    public List<BookCollection> findUserFitCollection2(Long userId){
//        List<BookCollection> collections =
//                queryFactory
//                        .select(bookCollection)
//                        .from(bookCollection,user)
//                        .where(
//                                bookCollection.collectionBooks.any().book.genre.stringValue()
//                                        .contains(user.categories.any().category.genre.stringValue())
//                        )
//                        .orderBy(bookCollection.likeCount.desc())
//                        .orderBy(bookCollection.view.desc())
//                        .limit(8)
//                        .fetch();
//        return collections;
//    }
}
