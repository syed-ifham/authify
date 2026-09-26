package authify.io;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileResponse {
    private String userId;
    private String name;
    private String email;
    @JsonProperty("isAccountVerified") // forcing explicitly 
    private boolean isAccountVerified; //jackson serializes it as accountVerified - treating it as a property
}
