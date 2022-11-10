package seb40_main_012.back.pairing;

import org.mapstruct.Mapper;
import seb40_main_012.back.pairing.entity.Pairing;

import java.util.List;

//@Mapper(componentModel = "spring")
public interface PairingMapper {

    Pairing pairingPostToPairing(PairingDto.Post pairingPost);
    Pairing pairingPatchToPairing(PairingDto.Patch pairingPatch);
    PairingDto.Response pairingTOPairingResponse(Pairing pairing);
    List<PairingDto.Response> pairingsToPairingResponses(List<Pairing> pairings);
}
