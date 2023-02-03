package TeamBigDipper.UYouBooDan.comment.dto;

import TeamBigDipper.UYouBooDan.global.dto.PageInfo;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class CommentMultiResDto<T> {
    private List<T> best;
    private List<T> data;
    private PageInfo pageInfo;

    public CommentMultiResDto(List<T> best, List<T> data, Page page){
        this.best = best;
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
