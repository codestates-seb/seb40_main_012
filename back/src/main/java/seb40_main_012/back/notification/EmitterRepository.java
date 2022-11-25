package seb40_main_012.back.notification;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;

public interface EmitterRepository {

    SseEmitter save(String emitterId, SseEmitter sseEmitter); // emitter 저장

    void saveEventCache(String emitterId, Object event); // event 저장

    Map<String, SseEmitter> findAllEmitterStartWithByMemberId(String memberId); // 해당 회원과 관련된 모든 emitter 검색

    Map<String, Object> findAllEventCacheStartWithByMemberId(String memberId); // 해당 회원과 관련된 모든 event 검색

    void deleteById(String id); // emitter 하나 삭제

    void deleteAllEmitterStartWithId(String memberId); // 해당 회원과 관련된 모든 emitter 삭제
    void deleteAllEventCacheStartWithId(String memberId); // 해당 회원과 관련된 모든 event 삭제
}
