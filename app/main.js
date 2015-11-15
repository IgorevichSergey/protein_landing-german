var __product_price = 26.99,
    __shipping_cost = {
        Österreich: 3.9,
        Deutschland: 6.9
    },
    _result_product_price_element = document.getElementById('result_product_price'),
    _product_quality_element = document.getElementById('product_quality'),
    _city_name_element = document.getElementById('city_name'),
    _shipping_cost_element = document.getElementById('shipping_cost'),
    _result_amount_element = document.getElementById('result_amount');


var _math_round = function(_x) {
        return _x.toFixed(2)
    },
    _set_result_value = function(){
        _result_product_price_element.innerHTML =_math_round(__product_price * _product_quality_element.value);
    },
     _set_result_amount_element = function(){
        _result_amount_element.innerHTML =_math_round(+_result_product_price_element.innerHTML + +_shipping_cost_element.innerHTML);
    };

var setShippingPrice = function(){
        if(_product_quality_element.value == 1){
            _shipping_cost_element.innerHTML = __shipping_cost[_city_name_element.value];
        } else {
            _shipping_cost_element.innerHTML = 0;
        }
        _set_result_amount_element();
    },
    setItemValue = function(){
        _set_result_value();
        setShippingPrice();
        _set_result_amount_element();
    };

_set_result_amount_element();
_set_result_value();
setShippingPrice();