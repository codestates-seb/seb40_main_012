package seb40_main_012.back.bookWiki;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-21T14:00:02+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.5 (Azul Systems, Inc.)"
)
@Component
public class BookWikiMapperImpl implements BookWikiMapper {

    @Override
    public BookWiki bookWikiPostToBookWiki(BookWikiDto.Post postBookWiki) {
        if ( postBookWiki == null ) {
            return null;
        }

        BookWiki.BookWikiBuilder bookWiki = BookWiki.builder();

        bookWiki.imagePath( postBookWiki.getImagePath() );
        bookWiki.spacetimeBackground( postBookWiki.getSpacetimeBackground() );
        bookWiki.characterTree( postBookWiki.getCharacterTree() );
        bookWiki.objectInside( postBookWiki.getObjectInside() );
        bookWiki.trivia( postBookWiki.getTrivia() );
        bookWiki.appendix( postBookWiki.getAppendix() );
        bookWiki.objectOutside( postBookWiki.getObjectOutside() );

        return bookWiki.build();
    }

    @Override
    public BookWiki bookWikiPatchToBookWiki(BookWikiDto.Patch patchBookWiki) {
        if ( patchBookWiki == null ) {
            return null;
        }

        BookWiki.BookWikiBuilder bookWiki = BookWiki.builder();

        bookWiki.imagePath( patchBookWiki.getImagePath() );
        bookWiki.spacetimeBackground( patchBookWiki.getSpacetimeBackground() );
        bookWiki.characterTree( patchBookWiki.getCharacterTree() );
        bookWiki.objectInside( patchBookWiki.getObjectInside() );
        bookWiki.trivia( patchBookWiki.getTrivia() );
        bookWiki.appendix( patchBookWiki.getAppendix() );
        bookWiki.objectOutside( patchBookWiki.getObjectOutside() );

        return bookWiki.build();
    }

    @Override
    public BookWikiDto.Response bookWikiToBookWikiResponse(BookWiki bookWiki) {
        if ( bookWiki == null ) {
            return null;
        }

        BookWikiDto.Response.ResponseBuilder response = BookWikiDto.Response.builder();

        response.bookWikiId( bookWiki.getBookWikiId() );
        response.view( bookWiki.getView() );
        response.imagePath( bookWiki.getImagePath() );
        response.spacetimeBackground( bookWiki.getSpacetimeBackground() );
        response.characterTree( bookWiki.getCharacterTree() );
        response.objectInside( bookWiki.getObjectInside() );
        response.trivia( bookWiki.getTrivia() );
        response.appendix( bookWiki.getAppendix() );
        response.objectOutside( bookWiki.getObjectOutside() );
        response.createdAt( bookWiki.getCreatedAt() );
        response.modifiedAt( bookWiki.getModifiedAt() );

        return response.build();
    }
}
