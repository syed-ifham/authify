package authify.repository;

import authify.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);

    @Query("SELECT u.userId FROM UserEntity u WHERE u.email = :email")
    Optional<String> findUserIdByEmail(@Param("email") String email);

    @Query("SELECT u.isAccountVerified from UserEntity  u WHERE u.email = :email")
    Optional<Boolean> findIsAccountVerifiedByEmail(@Param("email") String email);

    Boolean existsByEmail(String email);

}
