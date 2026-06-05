package com.app;

import com.app.config.AppConfig;
import com.app.dao.AssetDao;
import com.app.dao.AuthDao;
import com.app.dao_impl.AuthDaoImpl;
import com.app.enums.AssetStatus;
import com.app.exceptions.InvalidOwnershipException;
import com.app.exceptions.ResourceNotFoundException;
import com.app.model.Asset;
import com.app.model.User;
import jakarta.persistence.NoResultException;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;
import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext(AppConfig.class);
        AuthDao authDao = context.getBean(AuthDaoImpl.class);
        AssetDao assetDao = context.getBean(AssetDao.class);
        System.out.println("----------Asset Management : LOGIN---------");
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter Username: ");
        String username = sc.nextLine();
        System.out.println("Enter Password:");
        String password = sc.nextLine();
        try{
            User user = authDao.login(username, password);
            switch(user.getRole().toString()){
                case "HR":
                    System.out.println("Welcome " + username);
                    while(true){
                        System.out.println("1. Add Asset");
                        System.out.println("2. Delete Asset by id");
                        System.out.println("3. Fetch all Asset");
                        System.out.println("4. Update Asset");
                        System.out.println("5. Fetch Asset By Id");
                        System.out.println("0. Exit ");
                        int op = sc.nextInt();
                        if (op == 0)
                            break;
                        switch(op) {
                            case 1:
                                sc.nextLine();
                                System.out.println("Enter name");
                                String name = sc.nextLine();
                                System.out.println("Enter model");
                                String model = sc.nextLine();
                                System.out.println("Enter Asset Status");
                                String asset_status = sc.next();

                                assetDao.save(new Asset(name,model, AssetStatus.valueOf(asset_status)), username);
                                System.out.println("Asset added...");
                                break;
                            case 2:
                                System.out.println("Enter Asset id to delete");
                                int delete_id = sc.nextInt();
                                try {
                                    Asset asset = assetDao.getById(delete_id, username);
                                    assetDao.deleteById(asset);
                                }catch(ResourceNotFoundException | InvalidOwnershipException e){
                                    System.out.println(e.getMessage());
                                }
                                break;
                            case 3:
                                System.out.println("All Asset of "+username);
                                assetDao.getAllAsset(username).forEach(System.out::println);
                                break;
                            case 4:
                                System.out.println("Enter Asset id to update");
                                int id = sc.nextInt();
                                try {
                                    Asset asset = assetDao.getById(id, username);
                                    System.out.println("Existing Asset record");
                                    System.out.println("Enter values for update..");
                                    sc.nextLine();
                                    System.out.println("Enter name");
                                    name = sc.nextLine();
                                    System.out.println("Enter model");
                                    model = sc.nextLine();
                                    System.out.println("Enter asset status");
                                    asset_status = sc.next();
                                    asset.setName(name);
                                    asset.setModel(model);
                                    asset.setAsset_status(AssetStatus.valueOf(asset_status));
                                    assetDao.update(asset);
                                    System.out.println("Record updated");
                                }
                                catch(ResourceNotFoundException | InvalidOwnershipException e){
                                    System.out.println(e.getMessage());
                                }
                                break;
                            case 5:
                                System.out.println("Enter Asset id ");
                                int geIid = sc.nextInt();
                                try {
                                    Asset asset = assetDao.getById(geIid, username);
                                    System.out.println(asset);
                                }catch(ResourceNotFoundException | InvalidOwnershipException e){
                                    System.out.println(e.getMessage());
                                }
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        catch (NoResultException e){
            System.out.println("Invalid Credentials");
        }
        context.close();
    }
}