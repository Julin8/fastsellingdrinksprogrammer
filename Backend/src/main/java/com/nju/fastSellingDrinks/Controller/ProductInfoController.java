package com.nju.fastSellingDrinks.Controller;

import com.nju.fastSellingDrinks.model.ProductInfo;
import com.nju.fastSellingDrinks.service.ProductInfoService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductInfoController {

    @Resource
    private ProductInfoService productInfoService;

    @RequestMapping("rank")
    public List<ProductInfo> rank(){
        return productInfoService.productRank();
    }

    @RequestMapping("selectAll")
    public List<ProductInfo> selectAll(){
        return productInfoService.selectAll();
    }

    @RequestMapping("selectById/{id}")
    public ProductInfo selectById(@PathVariable Integer id){
        return productInfoService.selectById(id);
    }
}
