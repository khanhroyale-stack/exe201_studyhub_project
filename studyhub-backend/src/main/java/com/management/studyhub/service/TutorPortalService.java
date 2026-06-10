package com.management.studyhub.service;

import com.management.studyhub.dto.tutorportal.*;
import com.management.studyhub.entity.*;
import com.management.studyhub.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TutorPortalService {

    private final JobPostingRepository jobPostingRepository;
    private final ClassSessionRepository classSessionRepository;
    private final CommissionRecordRepository commissionRecordRepository;
    private final CourseRepository courseRepository;
    private final SubjectRepository subjectRepository;
    private final TutorProfileRepository tutorProfileRepository;
    private final ReviewRepository reviewRepository;
    private final TutorApplicationRepository tutorApplicationRepository;
    private final LessonLogRepository lessonLogRepository;

    public List<SubjectDTO> getSubjects() {
        return subjectRepository.findAll().stream().map(s -> {
            SubjectDTO dto = new SubjectDTO();
            dto.setId(s.getId());
            dto.setName(s.getName());
            return dto;
        }).collect(Collectors.toList());
    }

    public List<JobPostingDTO> getJobPostings(List<String> subjects, String learningMode, Double minPrice, Double maxPrice, String sortBy) {
        return jobPostingRepository.findAll().stream()
                .filter(jp -> "RECRUITING".equals(jp.getStatus()))
                .filter(jp -> subjects == null || subjects.isEmpty() || subjects.contains(jp.getSubject()))
                .filter(jp -> learningMode == null || learningMode.isEmpty() || learningMode.equalsIgnoreCase("ALL") || learningMode.equalsIgnoreCase(jp.getLearningMode()))
                .filter(jp -> minPrice == null || jp.getPricePerSession() >= minPrice)
                .filter(jp -> maxPrice == null || jp.getPricePerSession() <= maxPrice)
                .map(jp -> {
                    JobPostingDTO dto = new JobPostingDTO();
                    dto.setId(jp.getId());
                    dto.setTitle(jp.getTitle());
                    dto.setSubject(jp.getSubject());
                    dto.setLearningMode(jp.getLearningMode());
                    dto.setLocation(jp.getLocation());
                    dto.setSchedule(jp.getSchedule());
                    dto.setPricePerSession(jp.getPricePerSession());
                    dto.setApplicantsCount(jp.getApplicantsCount());
                    dto.setRequirement(jp.getRequirement());
                    if (jp.getParent() != null) {
                        dto.setParentName(jp.getParent().getName());
                        dto.setParentAvatar(jp.getParent().getAvatar());
                    }
                    dto.setPostedAt(jp.getPostedAt());
                    dto.setStatus(jp.getStatus());
                    return dto;
                })
                .sorted((j1, j2) -> {
                    if ("highest_price".equals(sortBy)) {
                        return Double.compare(j2.getPricePerSession(), j1.getPricePerSession());
                    }
                    if (j1.getPostedAt() != null && j2.getPostedAt() != null) {
                        return j2.getPostedAt().compareTo(j1.getPostedAt());
                    }
                    return 0;
                })
                .collect(Collectors.toList());
    }

    public JobPostingDTO getJobPostingById(Long id) {
        JobPosting jp = jobPostingRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        JobPostingDTO dto = new JobPostingDTO();
        dto.setId(jp.getId());
        dto.setTitle(jp.getTitle());
        dto.setSubject(jp.getSubject());
        dto.setLearningMode(jp.getLearningMode());
        dto.setLocation(jp.getLocation());
        dto.setSchedule(jp.getSchedule());
        dto.setPricePerSession(jp.getPricePerSession());
        dto.setApplicantsCount(jp.getApplicantsCount());
        dto.setRequirement(jp.getRequirement());
        if (jp.getParent() != null) {
            dto.setParentName(jp.getParent().getName());
            dto.setParentAvatar(jp.getParent().getAvatar());
        }
        dto.setPostedAt(jp.getPostedAt());
        dto.setStatus(jp.getStatus());
        return dto;
    }

    public void applyForJob(Long jobId, String message, String tutorName) {
        JobPosting jp = jobPostingRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Post not found"));
        TutorProfile tutor = tutorProfileRepository.findAll().stream()
                .filter(t -> tutorName.equals(t.getFullName()))
                .findFirst().orElseThrow(() -> new RuntimeException("Tutor not found"));

        TutorApplication app = new TutorApplication();
        app.setJobPosting(jp);
        app.setTutor(tutor);
        app.setMessage(message);
        app.setCreatedAt(LocalDateTime.now());
        app.setStatus(com.management.studyhub.entity.enums.ApplicationStatus.PENDING);
        tutorApplicationRepository.save(app);

        // Update applicants count
        if (jp.getApplicantsCount() == null) {
            jp.setApplicantsCount(1);
        } else {
            jp.setApplicantsCount(jp.getApplicantsCount() + 1);
        }
        jobPostingRepository.save(jp);
    }

    public List<ClassSessionDTO> getClassesForTutor(String tutorName) {
        // Find by String name OR by FK tutorProfile.fullName (for future parent-side integration)
        List<ClassSession> sessions = classSessionRepository.findAll().stream()
                .filter(cs -> tutorName.equals(cs.getTutorName())
                        || (cs.getTutorProfile() != null && tutorName.equals(cs.getTutorProfile().getFullName())))
                .collect(Collectors.toList());

        return sessions.stream().map(cs -> {
            ClassSessionDTO dto = new ClassSessionDTO();
            dto.setId(cs.getId());
            dto.setClassName(cs.getClassName());
            if (cs.getParent() != null) {
                dto.setParentName(cs.getParent().getName());
            }
            dto.setSchedule(cs.getSchedule());
            dto.setStatus(cs.getStatus());
            dto.setNextSessionDate(cs.getNextSessionDate());
            dto.setProgress(cs.getProgress());
            dto.setPricePerSession(250000.0);
            dto.setLearningMode("ONLINE");
            dto.setSubject("Môn học");
            return dto;
        }).collect(Collectors.toList());
    }

    public List<LessonScheduleDTO> getWeeklySchedule(String tutorName, LocalDateTime start, LocalDateTime end) {
        List<LessonLog> lessons = lessonLogRepository.findByClassSession_TutorNameAndScheduledDateBetween(tutorName, start, end);
        // Also find by tutorProfile.fullName
        List<LessonLog> lessonsProfile = lessonLogRepository.findByClassSession_TutorProfile_FullNameAndScheduledDateBetween(tutorName, start, end);
        
        List<LessonLog> allLessons = new java.util.ArrayList<>(lessons);
        allLessons.addAll(lessonsProfile);
        
        return allLessons.stream().distinct().map(log -> {
            LessonScheduleDTO dto = new LessonScheduleDTO();
            dto.setLessonId(log.getId());
            if (log.getClassSession() != null) {
                dto.setClassId(log.getClassSession().getId());
                dto.setClassName(log.getClassSession().getClassName());
                if (log.getClassSession().getParent() != null) {
                    dto.setParentName(log.getClassSession().getParent().getName());
                }
            } else {
                dto.setClassName("Lớp học");
            }
            if (log.getScheduledDate() != null) {
                dto.setDate(log.getScheduledDate().toLocalDate().toString());
            }
            if (log.getStartTime() != null) {
                dto.setStartTime(log.getStartTime().toString());
            }
            if (log.getEndTime() != null) {
                dto.setEndTime(log.getEndTime().toString());
            }
            dto.setStatus(log.getStatus() != null ? log.getStatus().name() : "SCHEDULED");
            dto.setSubject("Môn học");
            return dto;
        }).collect(Collectors.toList());
    }

    public void markLessonAttendance(Long lessonId) {
        LessonLog log = lessonLogRepository.findById(lessonId)
            .orElseThrow(() -> new RuntimeException("Lesson not found"));
        log.setStatus(com.management.studyhub.entity.enums.LessonStatus.PRESENT);
        lessonLogRepository.save(log);
    }

    public List<CommissionRecordDTO> getBillingForTutor(String tutorName) {
        return commissionRecordRepository.findAll().stream()
                .filter(cr -> cr.getApplication() != null
                        && cr.getApplication().getTutor() != null
                        && tutorName.equals(cr.getApplication().getTutor().getFullName()))
                .map(cr -> {
                    CommissionRecordDTO dto = new CommissionRecordDTO();
                    dto.setId(cr.getId());
                    dto.setMonth("Tháng " + LocalDateTime.now().getMonthValue() + "/" + LocalDateTime.now().getYear());
                    dto.setStatus(cr.getStatus().name());

                    // className from ClassSession description or request
                    if (cr.getApplication().getJobPosting() != null) {
                        dto.setClassName(cr.getApplication().getJobPosting().getTitle());
                    } else {
                        dto.setClassName("Lớp học");
                    }

                    // Use real sessionsCount & pricePerSession if available
                    int sessions = cr.getSessionsCount() != null ? cr.getSessionsCount() : 10;
                    BigDecimal pps = cr.getPricePerSession() != null ? cr.getPricePerSession() : cr.getAmount().multiply(BigDecimal.TEN);
                    BigDecimal totalRevenue = pps.multiply(BigDecimal.valueOf(sessions));

                    dto.setTotalSessions(sessions);
                    dto.setTotalRevenue(totalRevenue);
                    dto.setPlatformFeeAmount(cr.getAmount());
                    dto.setPlatformFeePercent(10);
                    dto.setDueDate(LocalDateTime.now().plusDays(5));
                    dto.setQrCodeUrl("https://api.vietqr.io/image/970436-0901234567-VnU9m2k.jpg?amount=" + cr.getAmount());
                    return dto;
                }).collect(Collectors.toList());
    }

    public List<ReviewDTO> getReviewsForTutor(String tutorName) {
        // Find tutor profile by name to get the ID
        TutorProfile tutor = tutorProfileRepository.findAll().stream()
                .filter(t -> tutorName.equals(t.getFullName()))
                .findFirst().orElse(null);
        if (tutor == null) return List.of();

        return reviewRepository.findByTutorId(tutor.getId()).stream()
                // MOCK SORTING FOR NOW AS REVIEW MISSING CREATEDAT:
                // .sorted(Comparator.comparing(Review::getCreatedAt).reversed())
                .map(fb -> {
                    ReviewDTO dto = new ReviewDTO();
                    dto.setId(fb.getId());
                    dto.setRating(fb.getRating());
                    dto.setComment(fb.getComment());
                    dto.setCreatedAt(LocalDateTime.now()); // MOCK
                    // Get parent name from class session
                    if (fb.getClassSession() != null && fb.getClassSession().getParent() != null) {
                        dto.setParentName(fb.getClassSession().getParent().getName());
                        dto.setParentAvatar(fb.getClassSession().getParent().getAvatar());
                        dto.setClassName(fb.getClassSession().getClassName());
                    } else {
                        dto.setParentName("Phụ huynh");
                        dto.setParentAvatar("https://ui-avatars.com/api/?name=PH&background=random");
                        dto.setClassName("Lớp học");
                    }
                    return dto;
                }).collect(Collectors.toList());
    }

    public List<TutorPostDTO> getMyPosts(String tutorName) {
        TutorProfile tutor = tutorProfileRepository.findAll().stream()
                .filter(t -> tutorName.equals(t.getFullName()))
                .findFirst().orElse(null);
        if (tutor == null) return List.of();

        return courseRepository.findAll().stream()
                .filter(c -> c.getTutor() != null && c.getTutor().getId().equals(tutor.getId()))
                .map(c -> {
                    TutorPostDTO dto = new TutorPostDTO();
                    dto.setId(c.getId());
                    dto.setTitle(c.getTitle());
                    dto.setSubjectName(c.getSubject() != null ? c.getSubject().getName() : "");
                    dto.setTeachingMethod(c.getLocationType());
                    dto.setPrice(c.getPrice());
                    dto.setDescription(c.getDescription());
                    dto.setImage(c.getImage());
                    dto.setRating(c.getRating());
                    dto.setReviewCount(c.getReviewCount());
                    dto.setSchedule(c.getSchedule());
                    dto.setLocation(c.getLocation());
                    return dto;
                }).collect(Collectors.toList());
    }

    public void deleteMyPost(Long courseId, String tutorName) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        if (course.getTutor() == null || !tutorName.equals(course.getTutor().getFullName())) {
            throw new RuntimeException("Unauthorized");
        }
        courseRepository.deleteById(courseId);
    }

    public Course createCourse(CreateCourseRequestDTO req, String tutorName) {
        TutorProfile tutor = tutorProfileRepository.findAll().stream()
                .filter(t -> t.getFullName().equals(tutorName))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Tutor not found"));

        Subject subject = null;
        if (req.getSubjectId() != null) {
            subject = subjectRepository.findById(req.getSubjectId()).orElse(null);
        }

        Course course = new Course();
        course.setTitle(req.getTitle());
        course.setSubject(subject);
        course.setDescription(req.getDescription());
        course.setLocationType(req.getTeachingMethod());
        course.setPrice(req.getPricePerSession() != null ? String.format("%,.0fđ", req.getPricePerSession()) : "Thỏa thuận");
        course.setImage(req.getImage());
        course.setSchedule(req.getSchedule());
        course.setLocation(req.getLocation());
        course.setRating(0.0);
        course.setReviewCount(0);
        course.setTutor(tutor);

        return courseRepository.save(course);
    }

    public List<com.management.studyhub.dto.parentportal.ParentTutorApplicationDTO> getMyApplications(String tutorName) {
        TutorProfile tutor = tutorProfileRepository.findAll().stream()
                .filter(t -> t.getFullName().equals(tutorName))
                .findFirst()
                .orElse(null);
        if (tutor == null) return List.of();

        return tutorApplicationRepository.findAll().stream()
                .filter(app -> app.getTutor() != null && app.getTutor().getId().equals(tutor.getId()))
                .map(app -> {
                    com.management.studyhub.dto.parentportal.ParentTutorApplicationDTO dto = new com.management.studyhub.dto.parentportal.ParentTutorApplicationDTO();
                    dto.setId(app.getId());
                    if (app.getJobPosting() != null) {
                        dto.setTutorTitle(app.getJobPosting().getTitle()); // Abusing for job title
                        if (app.getJobPosting().getParent() != null) {
                            dto.setTutorName(app.getJobPosting().getParent().getName()); // Abusing for parent name
                        }
                    }
                    dto.setMessage(app.getMessage());
                    dto.setStatus(app.getStatus() != null ? app.getStatus().name() : "PENDING");
                    dto.setAppliedAt(app.getCreatedAt() != null ? app.getCreatedAt().toString() : "");
                    return dto;
                }).collect(Collectors.toList());
    }
}
