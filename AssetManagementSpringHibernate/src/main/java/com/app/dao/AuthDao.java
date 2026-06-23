package com.app.dao;

import com.app.model.User;

public interface AuthDao {
    User login(String username, String password);
}
