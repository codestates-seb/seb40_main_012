package seb40_main_012.back.pairing;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import seb40_main_012.back.pairing.entity.Pairing;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-14T16:13:11+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.5 (Azul Systems, Inc.)"
)
@Component
public class PairingMapperImpl implements PairingMapper {

    @Override
    public Pairing pairingPostToPairing(PairingDto.Post postPairing) {
        if ( postPairing == null ) {
            return null;
        }

        Pairing pairing = new Pairing();

        return pairing;
    }

    @Override
    public Pairing pairingPatchToPairing(PairingDto.Patch patchPairing) {
        if ( patchPairing == null ) {
            return null;
        }

        Pairing pairing = new Pairing();

        return pairing;
    }

    @Override
    public Pairing pairingLikeToPairing(PairingDto.Like likePairing) {
        if ( likePairing == null ) {
            return null;
        }

        Pairing pairing = new Pairing();

        return pairing;
    }

    @Override
    public PairingDto.Response pairingToPairingResponse(Pairing pairing) {
        if ( pairing == null ) {
            return null;
        }

        PairingDto.Response response = new PairingDto.Response();

        return response;
    }

    @Override
    public List<PairingDto.Response> pairingsToPairingResponses(List<Pairing> pairings) {
        if ( pairings == null ) {
            return null;
        }

        List<PairingDto.Response> list = new ArrayList<PairingDto.Response>( pairings.size() );
        for ( Pairing pairing : pairings ) {
            list.add( pairingToPairingResponse( pairing ) );
        }

        return list;
    }
}
