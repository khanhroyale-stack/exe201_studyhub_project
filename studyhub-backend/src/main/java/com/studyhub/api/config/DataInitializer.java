package com.studyhub.api.config;

import com.studyhub.api.entity.ClassEntity;
import com.studyhub.api.entity.TutorEntity;
import com.studyhub.api.repository.ClassRepository;
import com.studyhub.api.repository.TutorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * DataInitializer - Tự động bơm dữ liệu mẫu vào H2 Database khi ứng dụng khởi động.
 * Chỉ chèn dữ liệu nếu database đang trống (tránh trùng lặp khi restart).
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final TutorRepository tutorRepository;
    private final ClassRepository classRepository;

    @Override
    public void run(String... args) throws Exception {
        seedTutors();
        seedClasses();
    }

    private void seedTutors() {
        if (tutorRepository.count() > 0) {
            log.info("✅ Dữ liệu gia sư đã tồn tại, bỏ qua seed.");
            return;
        }

        log.info("🌱 Đang bơm dữ liệu mẫu gia sư...");

        tutorRepository.save(TutorEntity.builder()
                .fullName("Nguyễn Minh Khoa")
                .specializedSubject("Toán học")
                .bio("Thạc sĩ Toán học tại ĐH Bách Khoa. Hơn 5 năm kinh nghiệm luyện thi THPT Quốc Gia, đã giúp hơn 200 học sinh đạt điểm 9+.")
                .rating(4.9)
                .avatarUrl("https://i.pravatar.cc/150?img=11")
                .build());

        tutorRepository.save(TutorEntity.builder()
                .fullName("Trần Thị Lan Anh")
                .specializedSubject("Tiếng Anh")
                .bio("Cử nhân Ngôn ngữ Anh, chứng chỉ IELTS 8.0. Chuyên luyện thi IELTS và giao tiếp học thuật cho học sinh từ lớp 8 đến lớp 12.")
                .rating(4.8)
                .avatarUrl("https://i.pravatar.cc/150?img=5")
                .build());

        tutorRepository.save(TutorEntity.builder()
                .fullName("Lê Văn Đức")
                .specializedSubject("Vật lý")
                .bio("Kỹ sư Vật lý ứng dụng, 7 năm kinh nghiệm giảng dạy. Phương pháp tư duy trực quan, giúp học sinh hiểu bản chất vấn đề thay vì học vẹt.")
                .rating(4.7)
                .avatarUrl("https://i.pravatar.cc/150?img=8")
                .build());

        tutorRepository.save(TutorEntity.builder()
                .fullName("Phạm Thu Hương")
                .specializedSubject("Hóa học")
                .bio("Tiến sĩ Hóa học tại ĐH Khoa Học Tự Nhiên. Chuyên gia luyện thi Hóa THPT, Olympiad và đại học. Tỷ lệ học sinh đậu chuyên Hóa đạt 95%.")
                .rating(5.0)
                .avatarUrl("https://i.pravatar.cc/150?img=47")
                .build());

        tutorRepository.save(TutorEntity.builder()
                .fullName("Võ Quốc Bảo")
                .specializedSubject("Lập trình")
                .bio("Senior Software Engineer với 8 năm kinh nghiệm tại các công ty công nghệ hàng đầu. Dạy lập trình Python, Java, Web Development cho mọi trình độ.")
                .rating(4.6)
                .avatarUrl("https://i.pravatar.cc/150?img=15")
                .build());

        log.info("✅ Đã bơm 5 gia sư mẫu thành công!");
    }

    private void seedClasses() {
        if (classRepository.count() > 0) {
            log.info("✅ Dữ liệu lớp học đã tồn tại, bỏ qua seed.");
            return;
        }

        log.info("🌱 Đang bơm dữ liệu mẫu lớp học...");

        classRepository.save(ClassEntity.builder()
                .title("Luyện thi Toán THPT Quốc Gia 2025")
                .subject("Toán học")
                .price(350000.0)
                .description("Khóa học tập trung ôn luyện toàn bộ chương trình Toán lớp 12, đặc biệt là các dạng bài hay gặp trong đề thi THPT Quốc Gia. Học 3 buổi/tuần vào các tối T2-T4-T6.")
                .status("OPEN")
                .tutorName("Nguyễn Minh Khoa")
                .build());

        classRepository.save(ClassEntity.builder()
                .title("Luyện thi IELTS cấp tốc - Mục tiêu 6.5+")
                .subject("Tiếng Anh")
                .price(450000.0)
                .description("Chương trình luyện thi IELTS trong 3 tháng, tập trung vào 4 kỹ năng Nghe-Nói-Đọc-Viết. Cam kết đầu ra tối thiểu 6.5 hoặc học lại miễn phí.")
                .status("OPEN")
                .tutorName("Trần Thị Lan Anh")
                .build());

        classRepository.save(ClassEntity.builder()
                .title("Vật lý cơ bản đến nâng cao - Lớp 11")
                .subject("Vật lý")
                .price(300000.0)
                .description("Ôn tập và củng cố kiến thức Vật lý lớp 11, chuẩn bị nền tảng vững chắc cho kỳ thi lớp 12. Sử dụng phương pháp tư duy hình ảnh và bài tập thực tế.")
                .status("OPEN")
                .tutorName("Lê Văn Đức")
                .build());

        classRepository.save(ClassEntity.builder()
                .title("Hóa học THPT - Ôn thi đại học")
                .subject("Hóa học")
                .price(400000.0)
                .description("Khóa học toàn diện cho Hóa học THPT, bao gồm Hóa Vô Cơ, Hữu Cơ và Đại Cương. Cung cấp hơn 1000 bài tập có lời giải chi tiết theo từng dạng.")
                .status("OPEN")
                .tutorName("Phạm Thu Hương")
                .build());

        classRepository.save(ClassEntity.builder()
                .title("Lập trình Python từ Zero đến Hero")
                .subject("Lập trình")
                .price(500000.0)
                .description("Khóa học lập trình Python bài bản cho người mới bắt đầu. Từ cú pháp cơ bản đến xây dựng các project thực tế như web scraping, automation và data analysis.")
                .status("OPEN")
                .tutorName("Võ Quốc Bảo")
                .build());

        log.info("✅ Đã bơm 5 lớp học mẫu thành công!");
    }
}
