    package com.config;

import com.model.*;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateConfig {
    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {
        if(sessionFactory == null) {
            Configuration configuration = new Configuration();
            configuration.setProperty("hibernate.connection.url", "jdbc:mysql://localhost:3306/assest_db?createDatabaseIfNotExist=true");
            configuration.setProperty("hibernate.connection.username", "root");
            configuration.setProperty("hibernate.connection.password", "123456");
            configuration.setProperty("hibernate.connection.driver_class", "com.mysql.cj.jdbc.Driver");
            // set the dialect
            configuration.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");

            // If u want to hibernate to generate the DB tables on the fly based on Model classes
            configuration.setProperty("hibernate.hbm2ddl.auto", "update");

            // Add model classes that we will create
            configuration.addAnnotatedClass(Asset.class);
            configuration.addAnnotatedClass(Hr.class);
            configuration.addAnnotatedClass(Employee.class);
            configuration.addAnnotatedClass(User.class);

            return configuration.buildSessionFactory();
        }
        return sessionFactory;
    }
    public void closeFactory(){
        sessionFactory.close();
    }
}
