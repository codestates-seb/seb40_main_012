package seb40_main_012.back.pairing;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import seb40_main_012.back.pairing.entity.Pairing;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-23T22:32:18+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.5 (Azul Systems, Inc.)"
)
@Component
public class PairingMapperImpl implements PairingMapper {

    @Override
    public Pairing pairingPatchToPairing(PairingDto.Patch patchPairing) {
        if ( patchPairing == null ) {
            return null;
        }

        Pairing.PairingBuilder pairing = Pairing.builder();

        pairing.pairingId( patchPairing.getPairingId() );
        pairing.pairingCategory( patchPairing.getPairingCategory() );
        pairing.imagePath( patchPairing.getImagePath() );
        pairing.title( patchPairing.getTitle() );
        pairing.body( patchPairing.getBody() );
        pairing.outLinkPath( patchPairing.getOutLinkPath() );

        return pairing.build();
    }

    @Override
    public Pairing pairingLikeToPairing(PairingDto.Like likePairing) {
        if ( likePairing == null ) {
            return null;
        }

        Pairing.PairingBuilder pairing = Pairing.builder();

        pairing.likeCount( likePairing.getLikeCount() );

        return pairing.build();
    }
}
