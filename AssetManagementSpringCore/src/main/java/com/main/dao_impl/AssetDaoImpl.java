package com.main.dao_impl;

import com.main.dao.AssetDao;
import com.main.enums.AssetStatus;
import com.main.exceptions.ResourceNotFoundException;
import com.main.model.Asset;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class AssetDaoImpl implements AssetDao {
    private final JdbcTemplate jdbcTemplate;

    public AssetDaoImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private RowMapper<Asset> mapper(){
        return (rs, num) -> {
            return new Asset(
                    rs.getInt("id"),
                    AssetStatus.valueOf(rs.getString("assetStatus").toUpperCase()),
                    rs.getString("model"),
                    rs.getString("name")
            );
        };
    }

            @Override
    public void insert(Asset asset) {
        String query = "insert  into asset(model, name, assetStatus)" + " values (?,?,?)";
        jdbcTemplate.update(query,
                asset.getModel(),
                asset.getName(),
                asset.getAssetStatus().toString());
        System.out.println("Asset Added Successfully");
    }

    @Override
    public List<Asset> getAll() {
        String sql = " select * from asset";
        return jdbcTemplate.query(sql,mapper());
    }

    @Override
    public Asset getById(int id) {
        String sql="select * from asset where id=?";
        return jdbcTemplate.queryForObject(sql,mapper(), id);
    }

    @Override
    public void deleteById(int id) throws ResourceNotFoundException {
        String query = "delete from asset where id = ?";
        int num = jdbcTemplate.update(query,id);
        if(num == 0)
            throw new ResourceNotFoundException("Invalid id");

        System.out.println("incident deleted");
    }

    @Override
    public void update(Asset asset) {
        String sql= "update asset SET model =? where id = ?";
        jdbcTemplate.update(sql,asset.getModel() , asset.getId());
        System.out.println("Record updated ");
    }
}
