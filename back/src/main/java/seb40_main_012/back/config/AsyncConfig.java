package seb40_main_012.back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurerSupport;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import java.util.concurrent.Executor;

@EnableAsync
@Configuration
public class AsyncConfig extends AsyncConfigurerSupport {

    public Executor getAsyncExecutor() {

        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5); // 기본적으로 실행 대기 중인 Thread 개수
        executor.setMaxPoolSize(50); // 동시에 동작하는 최대 Thread 개수
        executor.setQueueCapacity(500); // CorePool이 초과될때 Queue에 저장하는 최대 개수
        executor.setThreadNamePrefix("CherryPick_Async-"); // Thread 이름 접두사
        executor.initialize();
        return executor;
    }
}
