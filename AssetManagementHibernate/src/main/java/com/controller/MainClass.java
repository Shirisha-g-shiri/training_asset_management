package com.controller;

import com.config.HibernateConfig;
import com.enums.AssetStatus;
import com.exceptions.InvalidOwnershipException;
import com.exceptions.ResourceNotFoundException;
import com.model.Asset;
import com.model.User;
import com.service.AuthService;
import com.service.AssetService;
import jakarta.persistence.NoResultException;
import org.hibernate.Session;

import java.util.List;
import java.util.Scanner;

public class MainClass {
    public static void main(String[] args) {
        Session session =  HibernateConfig.getSessionFactory().openSession();
        Scanner scanner = new Scanner(System.in);
        AssetService assetService = new AssetService(session);
        AuthService authService = new AuthService(session);
        System.out.println("----------Asset Management : LOGIN---------");
        System.out.println("Enter Username ");
        String username = scanner.next();
        System.out.println("Enter Password ");
        String password = scanner.next();
        try {
            User user = authService.login(username, password);
            switch (user.getRole().toString()) {
                case "Hr":
                    System.out.println("Hr Menu");
                    while (true) {
                        System.out.println("1. Add Asset");
                        System.out.println("2. Delete Asset by id");
                        System.out.println("3. Fetch all Asset");
                        System.out.println("4. Update Asset");
                        System.out.println("0. Exit ");
                        int op = scanner.nextInt();
                        if(op ==0)
                            break;
                        switch(op){
                            case 1:
                                // Take input or prepare urself
                                Asset asset = new Asset();
                                scanner.nextLine();
                                System.out.println("Enter name: ");
                                asset.setName(scanner.nextLine());
                                System.out.println("Enter model: ");
                                asset.setModel(scanner.nextLine());
                                System.out.println("Enter Asset Status: ");
                                asset.setAsset_status(AssetStatus.valueOf(scanner.next()));
                                assetService.addAsset(asset, username);
                                System.out.println("Asset added.. ");
                                break;
                            case 2:
                                System.out.println("Enter Asset id to delete:");
                                int assetId= scanner.nextInt();
                                try {
                                    assetService.deleteById(assetId, username);
                                    System.out.println("Asset Deleted Successfully");
                                } catch (ResourceNotFoundException | InvalidOwnershipException e) {
                                    System.out.println(e.getMessage());
                                }
                                break;
                            case 3:
                                System.out.println("All Asset");
                                List<Asset> list = assetService.getAllAssets();
                                list.forEach(System.out::println);
                                break;
                        }
                    }
                    break;

                case "EMPLOYEE":
                    break;
                default:
                    System.out.println("invalid option. try again");
                    break;
            }
        }catch (NoResultException e){
            System.out.println("Invalid Credentials");
        }
        System.out.println("Works");
    }
}
