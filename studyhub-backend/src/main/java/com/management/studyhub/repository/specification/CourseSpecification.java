package com.management.studyhub.repository.specification;

import com.management.studyhub.entity.Course;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class CourseSpecification {

    public static Specification<Course> getCoursesByFilters(String keyword, String subjects, String grades, Double maxPrice, String method) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (keyword != null && !keyword.trim().isEmpty()) {
                String likeKeyword = "%" + keyword.trim().toLowerCase() + "%";
                Predicate titleMatch = criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), likeKeyword);
                Predicate descMatch = criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), likeKeyword);
                predicates.add(criteriaBuilder.or(titleMatch, descMatch));
            }

            if (subjects != null && !subjects.trim().isEmpty()) {
                String[] subjectArr = subjects.split(",");
                List<Predicate> subjectPredicates = new ArrayList<>();
                for (String subj : subjectArr) {
                    String likeSubj = "%" + subj.trim().toLowerCase() + "%";
                    Predicate titleMatch = criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), likeSubj);
                    Predicate descMatch = criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), likeSubj);
                    subjectPredicates.add(criteriaBuilder.or(titleMatch, descMatch));
                }
                predicates.add(criteriaBuilder.or(subjectPredicates.toArray(new Predicate[0])));
            }

            if (grades != null && !grades.trim().isEmpty()) {
                String[] gradeArr = grades.split(",");
                List<Predicate> gradePredicates = new ArrayList<>();
                for (String grade : gradeArr) {
                    String likeGrade = "%" + grade.trim().toLowerCase() + "%";
                    Predicate titleMatch = criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), likeGrade);
                    Predicate descMatch = criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), likeGrade);
                    gradePredicates.add(criteriaBuilder.or(titleMatch, descMatch));
                }
                predicates.add(criteriaBuilder.or(gradePredicates.toArray(new Predicate[0])));
            }

            if (method != null && !method.trim().isEmpty() && !method.equalsIgnoreCase("All")) {
                if (method.equalsIgnoreCase("Online")) {
                    predicates.add(criteriaBuilder.or(
                            criteriaBuilder.equal(root.get("locationType"), "computer"),
                            criteriaBuilder.equal(root.get("locationType"), "videocam")
                    ));
                } else if (method.equalsIgnoreCase("Offline")) {
                    predicates.add(criteriaBuilder.equal(root.get("locationType"), "location_on"));
                }
            }

            // Note: maxPrice is not strictly filtered due to string formatting "350.000đ" in DB,
            // but we could filter it if we extract the numbers. For now, it's ignored.

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
