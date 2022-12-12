package seb40_main_012.back.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.Slice;

@Getter
@AllArgsConstructor
public class SliceResponseDto<T> {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long listCount;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Boolean isLast;
    private Slice<T> data;

    public SliceResponseDto(Slice<T> data){
        this.data = data;
    }
}
