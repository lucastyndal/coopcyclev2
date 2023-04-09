package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Restaurant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Restaurant entity.
 */
@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    default Optional<Restaurant> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Restaurant> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Restaurant> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct restaurant from Restaurant restaurant left join fetch restaurant.category",
        countQuery = "select count(distinct restaurant) from Restaurant restaurant"
    )
    Page<Restaurant> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct restaurant from Restaurant restaurant left join fetch restaurant.category")
    List<Restaurant> findAllWithToOneRelationships();

    @Query("select restaurant from Restaurant restaurant left join fetch restaurant.category where restaurant.id =:id")
    Optional<Restaurant> findOneWithToOneRelationships(@Param("id") Long id);
}
