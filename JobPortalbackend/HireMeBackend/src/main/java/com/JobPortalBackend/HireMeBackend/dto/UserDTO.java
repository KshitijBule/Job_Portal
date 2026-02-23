package com.JobPortalBackend.HireMeBackend.dto;

import com.JobPortalBackend.HireMeBackend.entity.User;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private String id;
    @NotBlank(message = "{user.name.absent}")
    private String name;
    @NotBlank(message = "{user.email.absent}")
    @Email(message = "{user.email.invalid}")
    private String email;
    @NotBlank(message = "{user.password.absent}")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$",
            message = "{user.password.invalid}"
    )
    private String password;
    private AccountType accountType;

    public User toEntity(){
        return new User(this.id, this.name, this.email,this.password,this.accountType);
    }
}
