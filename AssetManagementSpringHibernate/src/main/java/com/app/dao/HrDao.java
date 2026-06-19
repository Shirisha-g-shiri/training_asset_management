package com.app.dao;

import com.app.model.Hr;

public interface HrDao {
    Hr getByUsername(String hrUsername);
}
