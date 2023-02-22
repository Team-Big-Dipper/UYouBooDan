package TeamBigDipper.UYouBooDan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class UYouBooDanApplication {

	public static void main(String[] args) {
		SpringApplication.run(UYouBooDanApplication.class, args);
	}

}
