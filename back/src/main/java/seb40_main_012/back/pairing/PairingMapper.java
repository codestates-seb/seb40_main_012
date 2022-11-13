package seb40_main_012.back.pairing;

import org.mapstruct.Mapper;
import seb40_main_012.back.pairing.entity.Pairing;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PairingMapper {

    Pairing pairingPostToPairing(PairingDto.Post postPairing);
    Pairing pairingPatchToPairing(PairingDto.Patch patchPairing);
    Pairing pairingLikeToPairing(PairingDto.Like likePairing);
//    Pairing pairingViewToPairing(PairingDto.View viewPairing);
    PairingDto.Response pairingToPairingResponse(Pairing pairing);
    List<PairingDto.Response> pairingsToPairingResponses(List<Pairing> pairings);
}
