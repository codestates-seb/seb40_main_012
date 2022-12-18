package seb40_main_012.back.aop;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class CommonPointcuts {

    @Pointcut("execution(* seb40_main_012.back.pairing.PairingController.createPairingLike(..))")
    public void createPairingLike () {}

    @Pointcut("execution(* seb40_main_012.back.common.comment.CommentController.createCommentLike(..))")
    public void createCommentLike () {}

    @Pointcut("createPairingLike() || createCommentLike()")
    public void createLike () {}

    @Pointcut("execution(* seb40_main_012.back.common.comment.CommentController.postPairingComment(..))")
    public void createPairingComment () {}

    @Pointcut("execution(* seb40_main_012.back.common.comment.CommentController.postBookCollectionComment(..))")
    public void createBookCollectionComment () {}

    @Pointcut("createPairingComment() || createBookCollectionComment()")
    public void createComment () {}

}
