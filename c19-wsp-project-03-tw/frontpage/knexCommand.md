### 係terminal current path 到打，唔係postgres打。

### create table user  -x 係後面file 名，ts 係ts file
``yarn knex migrate:make -x ts create-users``


### run create 左既野，佢一次過執行晒所有未行過既
``yarn knex migrate:latest``


### 返轉頭


```yarn knex migrate:rollback```


### undo 對上一個migration 

``yarn knex migrate:down``

### 所有野返到reset 

```yarn knex migrate:rollback --all```

### 輸入data

```yarn knex seed:make -x ts init-data ```

### import data

```yarn knex seed:run ```


### 平均數

```select avg(num_value) from agg_demo;```

### 加數

```select sum(num_value) from agg_demo;```

### 搵最細的number

```select min(num_value) from agg_demo;```

### 搵最大的number

```select max(num_value) from agg_demo;```

### 分group 再做統計

```select agg_demo.group from agg_demo group by agg_demo.group; ```


``` 
agg_demo.group，即係agg_demo入面column group  
from agg_demo ，即係table
group by agg_demo.group ，即係agg_demo入面column group  

分組數量係按數據入面有幾多unique既名字，有十個unqie就比10個

每組都store 若干data

```
### Group 完後再做每組最大的統計

select agg_demo.group , max(num_value) 
from agg_demo 
group by agg_demo.group; 

呢度係計num_value 的最大數


### Group 完後可以計多過一樣野

select agg_demo.group , max(num_value) , min(num_value) , 
count(num_value), avg(num_value)from agg_demo 
group by agg_demo.group;

### Aggregation 係唔可以用where ，要用having 

select agg_demo.group , max(num_value) ,min(num_value) ,
count(num_value), avg(num_value)from agg_demo 
group by agg_demo.group 
HAVING avg(num_value) >=50;


### before Aggregation係可以用where ，但只係當分組前的filter

select agg_demo.group , max(num_value) ,
min(num_value) , count(num_value), avg(num_value)
from agg_demo 
WHERE num_value>=50
group by agg_demo.group
HAVING avg(num_value) >=50;

### Distinct ，只拿unqiue 的野

select distinct (agg_demo.group) from agg_demo;


### Union即係psql 的(Join) 

將兩個上的table 上下join埋，但type 要相同，row 數目係相同，column 名都可以相同，但column 名可以as

select a_name as name from "union_demo_A"
union 
select b_name as name from "union_demo_B";

由於union_demo_A用左大楷，所以要run 一定要用"union_demo_A"
呢個as name 已經當成column name 咁

select a_name as name , a_level as level from "union_demo_A"
union 
select b_name as name , b_level as level from "union_demo_B";

### Union ，可以加左condition 之後，再union 一齊。只要column type 一樣就得

select a_name as name , a_level as level from "union_demo_A" where a_name ='Jason'
union 
select a_name as name , a_level as level from "union_demo_A" where a_name ='Peter';

### With 的用法

With 係可以拎table 一D 野，放入去variable 到

WITH XXX AS(
    SELECT .....
    UNION
    SELECT .....
),

SELECT * FROM XXX WHERE ....


### TRANSACTION

佢可以幫你一野行幾條SQL ，如果得就一齊得，唔得就會rollback 
防止出現交易期間，有條SQL得，有條SQL 唔得，造成同客戶混亂。
亦都保證USER A 造既野唔影響 USER B

首先要行```BEGIN;```，失敗左一次，就一定要```ROLLBACK```
如果insert 完野，你要確實資料，就要用```commit```

當有人行```BEGIN;```，另一個人未行但select * ，係睇唔到有人行```BEGIN;```既野
TRANSACTION 做既野，唔影響出面既野。
就算另一個人行```BEGIN;```入transaction ，都睇唔到，亦影響唔到其他行begin 既人。
DB 只會顯示空左一個ID
直至兩個人都commit ，出面D 人先睇到。
如果兩個transaction做既野一樣，先insert 果個人行先，另外一個永久hold 住，除非先insert 果個rollback或commit  