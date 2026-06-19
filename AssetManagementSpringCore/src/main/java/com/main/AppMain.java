package com.main;

import com.main.config.AppConfig;
import com.main.dao.AssetDao;
import com.main.dao_impl.AssetDaoImpl;
import com.main.enums.AssetStatus;
import com.main.exceptions.ResourceNotFoundException;
import com.main.model.Asset;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.dao.EmptyResultDataAccessException;

import javax.sql.DataSource;
import java.util.Scanner;

public class AppMain {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        System.out.println(context.getBean(DataSource.class));
        AssetDao assetDao = context.getBean(AssetDaoImpl.class);
        System.out.println("----------Asset Management---------");
        Scanner scanner = new Scanner(System.in);
        while(true) {
            System.out.println("1. Add Incident");
            System.out.println("2. Delete Incident by Id");
            System.out.println("3. Update Incident");
            System.out.println("4. All incidents ");
            System.out.println("5. Get Incident by id");
            System.out.println("0. Exit");
            int op = scanner.nextInt();
            if (op == 0)
                break;
            switch (op){
                case 1 :
                    Asset asset = new Asset();
                    scanner.nextLine();
                    System.out.println("Enter Asset Name: ");
                    asset.setName(scanner.nextLine());
                    System.out.println("Enter Asset Model: ");
                    asset.setModel(scanner.nextLine());
                    System.out.println("Enter Asset Status : ");
                    asset.setAssetStatus(AssetStatus.valueOf(scanner.nextLine().toUpperCase()));
                    assetDao.insert(asset);
                    break;
                case 2:
                    System.out.println("Enter Id to delete asset");
                    int id = scanner.nextInt();
                    try {
                        assetDao.deleteById(id);
                    }
                    catch(ResourceNotFoundException e){
                        System.out.println(e.getMessage());
                    }
                    break;
                case 3:
                    System.out.println("Enter asset id to update");
                    try {
                        Asset asset1 = assetDao.getById(scanner.nextInt());
                        System.out.println("Existing asset record ");
                        System.out.println(asset1);
                        System.out.println("Enter Model to edit");
                        scanner.nextLine();
                        String model = scanner.nextLine();
                        asset1.setModel(model);
                        assetDao.update(asset1);
                    }catch(EmptyResultDataAccessException e){
                        System.out.println("invalid id");
                    }
                    break;
                case 4:
                    assetDao.getAll().forEach(System.out::println);
                    break;
                case 5:
                    System.out.println("enter id to fetch record");
                    id = scanner.nextInt();
                    try {
                        Asset asset2 = assetDao.getById(id);
                        System.out.println(asset2);
                    }
                    catch(EmptyResultDataAccessException e){
                        System.out.println("invalid id");
                    }
                    break;
                default:
                    System.out.println("Invalid Option");
                    break;

            }
        }
    }
}
