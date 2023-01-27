package TeamBigDipper.UYouBooDan.global.security.filter;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@RequiredArgsConstructor
public class FilterChainExceptionHandlerFilter extends OncePerRequestFilter {

    private final FilterExceptionResolver filterExceptionResolver;

    @Override
    @SneakyThrows
    protected void doFilterInternal (HttpServletRequest request, HttpServletResponse response,
                                     FilterChain filterChain) {

        try { filterChain.doFilter(request, response); }
        catch (RuntimeException re) { filterExceptionResolver.handleException(re, response); }

    }

}
