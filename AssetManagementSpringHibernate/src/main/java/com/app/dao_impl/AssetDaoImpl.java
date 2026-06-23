package com.app.dao_impl;

import com.app.dao.AssetDao;
import com.app.enums.AssetStatus;
import com.app.exceptions.InvalidOwnershipException;
import com.app.exceptions.ResourceNotFoundException;
import com.app.model.Asset;
import com.app.model.Hr;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Component
@Transactional
public class AssetDaoImpl implements AssetDao {
    @PersistenceContext
    private EntityManager entityManager;

    private HrDaoImpl hrDao;

    @Autowired
    public void setHrDao(HrDaoImpl hrDao) {
        this.hrDao = hrDao;
    }
    @Override
    public List<Asset> getAllAsset(String username) {
        TypedQuery<Asset> query
                =  entityManager.createQuery("select a from Asset a where a.hr.user.username =: username", Asset.class);
        query.setParameter("username" ,username);
        return query.getResultList();
    }

    @Override
    public void save(Asset asset,String hrUsername) {
        Hr hr = hrDao.getByUsername(hrUsername);
        asset.setHr(hr);
        asset.setAsset_status(AssetStatus.PENDING);

        entityManager.persist(asset);
    }

    @Override
    public Asset getById(int id, String hrUsername) {
        Asset asset = entityManager.find(Asset.class, id);
        if(asset == null)
            throw new ResourceNotFoundException("Invalid id given..");
        if(!(asset.getHr().getUser().getUsername().equals(hrUsername))){
            throw new InvalidOwnershipException("You do not own this asset");
        }


        return asset;
    }

    @Override
    public void update(Asset asset) {
        entityManager.merge(asset);
    }

    @Override
    public void deleteById(Asset asset) {
        entityManager.remove(asset);
    }
}
