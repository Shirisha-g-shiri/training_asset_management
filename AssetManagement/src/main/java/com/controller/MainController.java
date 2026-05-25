package com.controller;

import com.config.HibernateConfig;
import com.enums.AssetStatus;
import com.expection.ResourceNotFoundException;
import com.model.Asset;
import com.service.AssetService;
import org.hibernate.Session;

import java.util.List;
import java.util.Scanner;

public class MainController {
    public static void main(String[] args){
        Session session = HibernateConfig.getSessionFactory().openSession();
        Scanner scanner = new Scanner(System.in);
        AssetService assetService = new AssetService(session);
        while(true){
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
                    Asset asset = new Asset();
                    System.out.println("Give details to creat new asset");
                    scanner.nextLine();
                    System.out.println("Enter Name: ");
                    asset.setName(scanner.nextLine());
                    System.out.println("Enter Model: ");
                    asset.setModel(scanner.nextLine());
                    System.out.println("Enter Status: ");
                    asset.setAssetStatus(AssetStatus.valueOf(scanner.nextLine()));
                    assetService.insert(asset);
                    System.out.println("Asset Added");
                    break;
                case 2:
                    System.out.println("Enter AssetID to delete the record");
                    int id = scanner.nextInt();
                    try{
                        assetService.deleteRecord(id);
                        System.out.println("Record deleted");
                    }
                    catch(ResourceNotFoundException e ){
                        System.out.println(e.getMessage());
                    }
                    break;
                case 3:
                    System.out.println("All Asset");
                    List<Asset> list = assetService.getAllAssets();
                    list.forEach(System.out::println);
                    break;
                case 4:
                    System.out.println("Enter the asset id to update");
                    id = scanner.nextInt();
                    try{
                        asset = assetService.getById(id); //this comes from DB
                        System.out.println("Existing asset record  " + asset);
                        scanner.nextLine();
                        System.out.println("Enter Name: ");
                        asset.setName(scanner.nextLine());
                        System.out.println("Enter Model: ");
                        asset.setModel(scanner.nextLine());
                        System.out.println("Enter Status: ");
                        asset.setAssetStatus(AssetStatus.valueOf(scanner.next()));
                        assetService.insert(asset);
                    }
                    catch (ResourceNotFoundException e){
                        System.out.println(e.getMessage());
                    }
                    break;
                default:
                    System.out.println("invalid option. try again");
                    break;
            }
        }
    }
}
