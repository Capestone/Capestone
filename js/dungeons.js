
function dungeonLoader()
{
    //Dungeon 0
    dungeonCode[0] = function(x, y) 
    {
        coordinates[x + 1][y + 1] = new environment();
        coordinates[x + 1][y + 1].image.src = "images/column.png";
        coordinates[x + 3][y + 1] = new environment();
        coordinates[x + 3][y + 1].image.src = "images/column.png";
        coordinates[x + 1][y + 3] = new environment();
        coordinates[x + 1][y + 3].image.src = "images/brokenColumn.png";
        coordinates[x + 3][y + 3] = new environment();
        coordinates[x + 3][y + 3].image.src = "images/column.png";
        coordinates[x + 2][y + 2] = new environment();
        coordinates[x + 2][y + 2].image.src = "images/altar.png";

        coordinates[x + 1][y + 6] = new environment();
        coordinates[x + 1][y + 6].image.src = "images/rockWall.png";
        coordinates[x + 1][y + 8] = new environment();
        coordinates[x + 1][y + 8].image.src = "images/rockWall.png";
        coordinates[x + 5][y + 6] = new environment();
        coordinates[x + 5][y + 6].image.src = "images/rockWall.png";
        coordinates[x + 5][y + 8] = new environment();
        coordinates[x + 5][y + 8].image.src = "images/rockWall.png";

        coordinates[x + 3][y + 7] = new environment();
        coordinates[x + 3][y + 7].image.src = "images/candelabra.png";

        for (var i = 5; i < 9; i++)
        {
            coordinates[x + i][y + 4] = new environment();
            coordinates[x + i][y + 4].image.src = "images/rockWall.png";
        }

        for (var i = 1; i < 6; i++)
        {
            coordinates[x + i][y + 5] = new environment();
            coordinates[x + i][y + 5].image.src = "images/rockWall.png";
        }

        for (var i = 0; i < 5; i++)
        {
            coordinates[x + 9][y + i] = new environment();
            coordinates[x + 9][y + i].image.src = "images/rockWall.png";
        }

        for (var i = 1; i < 6; i++)
        {
            coordinates[x + i][y + 9] = new environment();
            coordinates[x + i][y + 9].image.src = "images/rockWall.png";
        }
    }
    
    //Dungeon 1
    dungeonCode[1] = function(x, y) {
        for (var i = 0; i < 10; i++)
    {
        if (i % 2 === 1 && i != 3)
        {
            coordinates[x + i][y + 1] = new environment();
            coordinates[x + i][y + 1].image.src = "images/column.png";
        }
        else if (i % 2 === 1)
        {
            coordinates[x + i][y + 1] = new environment();
            coordinates[x + i][y + 1].image.src = "images/brokenColumn.png";
        }
    }
    
    for (var i = 0; i < 10; i++)
    {
        if (i % 2 === 0 && i !== 8)
        {
            coordinates[x + i][y + 3] = new environment();
            coordinates[x + i][y + 3].image.src = "images/column.png";
        }
        else if (i % 2 === 0)
        {
            coordinates[x + i][y + 3] = new environment();
            coordinates[x + i][y + 3].image.src = "images/brokenColumn.png";
        }
    }
    
    for (var i = 0; i < 10; i++)
    {
        if (i % 2 === 0 && i !== 4)
        {
            coordinates[x + i][y + 7] = new environment();
            coordinates[x + i][y + 7].image.src = "images/column.png";
        }
        else if (i % 2 === 0)
        {
            coordinates[x + i][y + 7] = new environment();
            coordinates[x + i][y + 7].image.src = "images/brokenColumn.png";
        }
    }
    
    for (var i = 0; i < 10; i++)
    {
        if (i % 2 === 1 && i !== 7)
        {
            coordinates[x + i][y + 9] = new environment();
            coordinates[x + i][y + 9].image.src = "images/column.png";
        }
        else if (i % 2 === 1)
        {
            coordinates[x + i][y + 9] = new environment();
            coordinates[x + i][y + 9].image.src = "images/brokenColumn.png";
        }
    }
    
    coordinates[x + 1][y + 5] = new environment();
    coordinates[x + 1][y + 5].image.src = "images/stocks.png";
    
    coordinates[x + 4][y + 5] = new environment();
    coordinates[x + 4][y + 5].image.src = "images/candelabra.png";
    
    coordinates[x + 7][y + 5] = new environment();
    coordinates[x + 7][y + 5].image.src = "images/stocks.png";
        
    }
    
    dungeonCode[2] = function(x, y)
    {
        for (var i = 1; i <= 6; i++)
        {
            coordinates[x + i][y + 1] = new environment();
            coordinates[x + i][y + 1].image.src = "images/rockWall.png"; 
        }

        for (var i = 1; i <= 9; i++)
        {
            if (i != 4)
            {
                coordinates[x + 6][y + i] = new environment();
                coordinates[x + 6][y + i].image.src = "images/rockWall.png";
            }
            else
            {
                coordinates[x + 6][y + 4] = new environment();
                coordinates[x + 6][y + 4].image.src = "images/vaultDoor.png";
                coordinates[x + 6][y + 4].type = "door";
            }
        }

        for (var i = 2; i <= 9; i++)
        {
            coordinates[x + i][y + 6] = new environment();
            coordinates[x + i][y + 6].image.src = "images/rockWall.png";
        }

        for (var i = 2; i <= 6; i++)
        {
            coordinates[x + 1][y + i] = new environment();
            coordinates[x + 1][y + i].image.src = "images/rockWall.png";
        }


        for (var i = 6; i <= 9; i++)
        {
            if (i != 8)
            {
                coordinates[x + i][y + 6] = new environment();
                coordinates[x + i][y + 6].image.src = "images/rockWall.png";
            }
            else
            {
                coordinates[x + i][y + 6] = new environment();
                coordinates[x + i][y + 6].image.src = "images/vaultDoor.png";
                coordinates[x + i][y + 6].type = "door";
            }
        }


        for (var i = 6; i <= 9; i++)
        {
            coordinates[x + i][y + 9] = new environment();
            coordinates[x + i][y + 9].image.src = "images/rockWall.png";
        }

        for (var i = 6; i <= 9; i++)
        {
            coordinates[x + 9][y + i] = new environment();
            coordinates[x + 9][y + i].image.src = "images/rockWall.png";
        }

        coordinates[x + 7][y + 3] = new environment();
        coordinates[x + 7][y + 3].image.src = "images/weaponRack.png";

        coordinates[x + 7][y + 5] = new environment();
        coordinates[x + 7][y + 5].image.src = "images/weaponRack.png";

        coordinates[x + 8][y + 8] = new environment();
        coordinates[x + 8][y + 8].image.src = "images/closedChest.png";
        coordinates[x + 8][y + 8].itemName = "treasure chest";
        coordinates[x + 8][y + 8].inventory.push(getRandomItem());
    }
    
    dungeonCode[3] = function(x, y)
    {
        for (var i = 1; i <= 8; i++)
        {
            if (i !== 4 && i !== 5)
            {
                coordinates[x + 3][y + i] = new environment();
                coordinates[x + 3][y + i].image.src = "images/candelabra.png";
            }
        }
        for (var i = 1; i <= 8; i++)
        {
            if (i !== 4 && i !== 5)
            {
                coordinates[x + 6][y + i] = new environment();
                coordinates[x + 6][y + i].image.src = "images/candelabra.png";
            }
        }
        for (var i = 1; i <= 8; i++)
        {
            if (i !== 4 && i !== 5)
            {
                coordinates[x + i][y + 6] = new environment();
                coordinates[x + i][y + 6].image.src = "images/candelabra.png";
            }
        }
        for (var i = 1; i <= 8; i++)
        {
            if (i !== 4 && i !== 5)
            {
                coordinates[x + i][y + 3] = new environment();
                coordinates[x + i][y + 3].image.src = "images/candelabra.png";
            }
        }   
    }
    
    dungeonCode[4] = function(x, y)
    {
        for (var i = 3; i <= 9; i++)
        {
            coordinates[x + i][y] = new environment();
            coordinates[x + i][y].image.src = "images/rockWall.png";

        }
        for (var i = 1; i <= 7; i++)
        {
            coordinates[x + 3][y + i] = new environment();
            coordinates[x + 3][y + i].image.src = "images/rockWall.png";
        }
        for (var i = 1; i <= 7; i++)
        {
            coordinates[x + 9][y + i] = new environment();
            coordinates[x + 9][y + i].image.src = "images/rockWall.png";
        }
        for (var i = 4; i <= 8; i++)
        {
            if ( i != 6 )
            {
                coordinates[x + i][y + 8] = new environment();
                coordinates[x + i][y + 8].image.src = "images/rockWall.png";
            }
            else
            {
                coordinates[x + i][y + 8] = new environment();
                coordinates[x + i][y + 8].image.src = "images/vaultDoor.png";
                coordinates[x + i][y + 8].type = "door";
            }
        }

        coordinates[x + 4][y + 7] = new environment();
        coordinates[x + 4][y + 7].image.src = "images/rockWall.png";

        coordinates[x + 8][y + 7] = new environment();
        coordinates[x + 8][y + 7].image.src = "images/rockWall.png";

        coordinates[x + 4][y + 4] = new environment();
        coordinates[x + 4][y + 4].image.src = "images/column.png";

        coordinates[x + 5][y + 5] = new environment();
        coordinates[x + 5][y + 5].image.src = "images/column.png";

        coordinates[x + 7][y + 5] = new environment();
        coordinates[x + 7][y + 5].image.src = "images/column.png";

        coordinates[x + 8][y + 4] = new environment();
        coordinates[x + 8][y + 4].image.src = "images/column.png";

        coordinates[x + 5][y + 2] = new environment();
        coordinates[x + 5][y + 2].image.src = "images/angelStatue.png";

        coordinates[x + 6][y + 2] = new environment();
        coordinates[x + 6][y + 2].image.src = "images/altar.png";

        coordinates[x + 7][y + 2] = new environment();
        coordinates[x + 7][y + 2].image.src = "images/knightStatue.png";
    }
    dungeonCode[5] = function(x, y)
    {
        for (var i = 0; i <= 3; i++)
        {
            coordinates[x + i][y + 2] = new environment();
            coordinates[x + i][y + 2].image.src = "images/stableFence.png";
        }
        for (var i = 0; i <= 3; i++)
        {
            coordinates[x + i][y + 5] = new environment();
            coordinates[x + i][y + 5].image.src = "images/stableFence.png";
        }
        for (var i = 0; i <= 3; i++)
        {
            coordinates[x + i][y + 8] = new environment();
            coordinates[x + i][y + 8].image.src = "images/stableFence.png";
        }
        for (var i = 6; i <= 9; i++)
        {
            coordinates[x + i][y] = new environment();
            coordinates[x + i][y].image.src = "images/stableFence.png";
        }
        for (var i = 5; i <= 9; i++)
        {
            coordinates[x + i][y + 3] = new environment();
            coordinates[x + i][y + 3].image.src = "images/rockWall.png";
        }
        for (var i = 5; i <= 9; i++)
        {
            coordinates[x + i][y + 7] = new environment();
            coordinates[x + i][y + 7].image.src = "images/rockWall.png";
        }
        for (var i = 4; i <= 6; i++)
        {
            coordinates[x + 9][y + i] = new environment();
            coordinates[x + 9][y + i].image.src = "images/rockWall.png";
        }
        for (var i = 4; i <= 6; i++)
        {
            if(i!=5)
            {
                coordinates[x + 5][y + i] = new environment();
                coordinates[x + 5][y + i].image.src = "images/rockWall.png";
            }
            else
            {
                coordinates[x + 5][y + i] = new environment();
                coordinates[x + 5][y + i].image.src = "images/mossyDoor.png";
                coordinates[x + 5][y + i].pass = true;
            }
        }
        coordinates[x + 7][y + 5] = new environment();
        coordinates[x + 7][y + 5].image.src = "images/closedChest.png";
        coordinates[x + 7][y + 5].itemName = "treasure chest";
        coordinates[x + 7][y + 5].inventory.push(getRandomItem());
    }
    
    dungeonCode[6] = function(x, y)
    {
        for (var i = 0; i <= 8; i++)
        {
            coordinates[x + 1][y + i] = new environment();
            coordinates[x + 1][y + i].image.src = "images/rockWall.png";
        }
        for (var i = 1; i <= 9; i++)
        {
            coordinates[x + 3][y + i] = new environment();
            coordinates[x + 3][y + i].image.src = "images/rockWall.png";
        }
        for (var i = 0; i <= 3; i++)
        {
            coordinates[x + 5][y + i] = new environment();
            coordinates[x + 5][y + i].image.src = "images/rockWall.png";
        }
        for (var i = 1; i <= 4; i++)
        {
            coordinates[x + 7][y + i] = new environment();
            coordinates[x + 7][y + i].image.src = "images/rockWall.png";
        }
        for (var i = 4; i <= 8; i++)
        {
            coordinates[x + i][y + 5] = new environment();
            coordinates[x + i][y + 5].image.src = "images/rockWall.png";
        }
        for (var i = 5; i <= 9; i++)
        {
            coordinates[x + i][y + 7] = new environment();
            coordinates[x + i][y + 7].image.src = "images/rockWall.png";
        }
        for (var i = 4; i <= 7; i++)
        {
            coordinates[x + i][y + 9] = new environment();
            coordinates[x + i][y + 9].image.src = "images/rockWall.png";
        }

        coordinates[x + 8][y + 1] = new environment();
        coordinates[x + 8][y + 1].image.src = "images/rockWall.png";

        coordinates[x + 9][y + 3] = new environment();
        coordinates[x + 9][y + 3].image.src = "images/rockWall.png";
    }
    
    dungeonCode[7] = function(x, y)
    {
        for (var i = 0; i <= 9; i++)
        {
            if(i===2 || i===3 || i===6 || i===7)
            {
                coordinates[x][y + i] = new environment();
                coordinates[x][y + i].image.src = "images/column.png";
            }
        }
        for (var i = 0; i <= 9; i++)
        {
            if(i===3 || i===7)
            {
                coordinates[x + 1][y + i] = new environment();
                coordinates[x + 1][y + i].image.src = "images/column.png";
            }
        }
        for (var i = 0; i <= 9; i++)
        {
            if(i===0 || i===1 || i===5 || i===9)
            {
                coordinates[x + 2][y + i] = new environment();
                coordinates[x + 2][y + i].image.src = "images/column.png";
            }
        }
        for (var i = 0; i <= 9; i++)
        {
            if(i===1 || i===2 || i===5 || i===6 || i===9)
            {
                coordinates[x + 3][y + i] = new environment();
                coordinates[x + 3][y + i].image.src = "images/column.png";
            }
        }
        for (var i = 0; i <= 9; i++)
        {
            if(i===2 || i===3 || i===6 || i===7)
            {
                coordinates[x + 4][y + i] = new environment();
                coordinates[x + 4][y + i].image.src = "images/column.png";
            }
        }
        for (var i = 0; i <= 9; i++)
        {
            if(i===3 || i===4 || i===7 || i===8)
            {
                coordinates[x + 5][y + i] = new environment();
                coordinates[x + 5][y + i].image.src = "images/column.png";
            }
        }
        for (var i = 0; i <= 9; i++)
        {
            if(i===0 || i===4 || i===5 || i===8 || i===9)
            {
                coordinates[x + 6][y + i] = new environment();
                coordinates[x + 6][y + i].image.src = "images/column.png";
            }
        }
        for (var i = 0; i <= 9; i++)
        {
            if( i===2 || i===5 )
            {
                coordinates[x + 7][y + i] = new environment();
                coordinates[x + 7][y + i].image.src = "images/column.png";
            }
        }
        for (var i = 0; i <= 9; i++)
        {
            if(i===2 || i===3 || i===7)
            {
                coordinates[x + 8][y + i] = new environment();
                coordinates[x + 8][y + i].image.src = "images/column.png";
            }
        }
        for (var i = 0; i <= 9; i++)
        {
            if(i===3 || i===4 || i===7 || i===8)
            {
                coordinates[x + 9][y + i] = new environment();
                coordinates[x + 9][y + i].image.src = "images/column.png";
            }
        }
    }
    
    dungeonCode[8] = function(x, y)
    {
        for (var i = 1; i <= 8; i++)
        {
            if(i===1 || i===2 || i===7 || i===8)
            {
                coordinates[x + i][y + 1] = new environment();
                coordinates[x + i][y + 1].image.src = "images/column.png";
            }
        }

        coordinates[x + 1][y + 2] = new environment();
        coordinates[x + 1][y + 2].image.src = "images/column.png";

        coordinates[x + 2][y + 2] = new environment();
        coordinates[x + 2][y + 2].image.src = "images/angelStatue.png";

        coordinates[x + 7][y + 2] = new environment();
        coordinates[x + 7][y + 2].image.src = "images/brokenKnightStatue.png";

        coordinates[x + 8][y + 2] = new environment();
        coordinates[x + 8][y + 2].image.src = "images/brokenColumn.png";

        coordinates[x + 4][y + 4] = new environment();
        coordinates[x + 4][y + 4].image.src = "images/brokenAngelStatue.png";

        coordinates[x + 5][y + 4] = new environment();
        coordinates[x + 5][y + 4].image.src = "images/knightStatue.png";

        coordinates[x + 5][y + 5] = new environment();
        coordinates[x + 5][y + 5].image.src = "images/angelStatue.png";

        coordinates[x + 4][y + 5] = new environment();
        coordinates[x + 4][y + 5].image.src = "images/brokenKnightStatue.png";

        for (var i = 1; i <= 8; i++)
        {
            if(i===1 || i===8)
            {
                coordinates[x + i][y + 7] = new environment();
                coordinates[x + i][y + 7].image.src = "images/column.png";
            }
            else if (i===2)
            {
                coordinates[x + i][y + 7] = new environment();
                coordinates[x + i][y + 7].image.src = "images/knightStatue.png";
            }
            else if (i===7)
            {
                coordinates[x + i][y + 7] = new environment();
                coordinates[x + i][y + 7].image.src = "images/brokenAngelStatue.png";
            }
        }
        for (var i = 1; i <= 8; i++)
        {
            if(i===1 || i===8)
            {
                coordinates[x + i][y + 8] = new environment();
                coordinates[x + i][y + 8].image.src = "images/column.png";
            }
            else if(i===2 || i===7)
            {
                coordinates[x + i][y + 8] = new environment();
                coordinates[x + i][y + 8].image.src = "images/brokenColumn.png";
            }
        }
    }
    
    dungeonCode[9] = function(x, y)
    {
        for (var i = 4; i <= 9; i++)
        {
            if(i===4 || i===7 || i===9)
            {
                coordinates[x + i][y] = new environment();
                coordinates[x + i][y].image.src = "images/bareTree.png";
            }
        }

        coordinates[x + 1][y + 1] = new environment();
        coordinates[x + 1][y + 1].image.src = "images/bareTree.png";

        for (var i = 3; i <= 8; i++)
        {
            if(i===3 || i===5 || i===8)
            {
                coordinates[x + i][y + 2] = new environment();
                coordinates[x + i][y + 2].image.src = "images/bareTree.png";
            }
        } 

        coordinates[x + 5][y + 3] = new environment();
        coordinates[x + 5][y + 3].image.src = "images/bareTree.png";

        coordinates[x + 1][y + 4] = new environment();
        coordinates[x + 1][y + 4].image.src = "images/bareTree.png";

        coordinates[x + 6][y + 4] = new environment();
        coordinates[x + 6][y + 4].image.src = "images/bareTree.png";

        for (var i = 3; i <= 8; i++)
        {
            if(i===3 || i===8)
            {
                coordinates[x + i][y + 5] = new environment();
                coordinates[x + i][y + 5].image.src = "images/bareTree.png";
            }
            else if(i>=5 && i<=7)
            {
                coordinates[x + i][y + 5] = new environment();
                coordinates[x + i][y + 5].image.src = "images/stableFence.png";
            }
        } 
        for (var i = 2; i <= 7; i++)
        {
            if(i===2)
            {
                coordinates[x + i][y + 6] = new environment();
                coordinates[x + i][y + 6].image.src = "images/bareTree.png";
            }
            else if(i===5 || i===7)
            {
                coordinates[x + i][y + 6] = new environment();
                coordinates[x + i][y + 6].image.src = "images/stableFence.png";
            }
            else if(i===6)
            {
                coordinates[x + i][y + 6] = new environment();
                coordinates[x + i][y + 6].image.src = "images/knightStatue.png";
            }
        } 
        for (var i = 4; i <= 9; i++)
        {
            if(i===4)
            {
                coordinates[x + i][y + 7] = new environment();
                coordinates[x + i][y + 7].image.src = "images/bareTree.png";
            }
            else if(i>=5 && i<=7)
            {
                coordinates[x + i][y + 7] = new environment();
                coordinates[x + i][y + 7].image.src = "images/stableFence.png";
            }
            else if(i===9)
            {
                coordinates[x + i][y + 7] = new environment();
                coordinates[x + i][y + 7].image.src = "images/bareTree.png";
            }
        } 

        coordinates[x + 1][y + 8] = new environment();
        coordinates[x + 1][y + 8].image.src = "images/bareTree.png";

        coordinates[x + 8][y + 8] = new environment();
        coordinates[x + 8][y + 8].image.src = "images/bareTree.png";

        coordinates[x + 3][y + 9] = new environment();
        coordinates[x + 3][y + 9].image.src = "images/bareTree.png";

        coordinates[x + 6][y + 9] = new environment();
        coordinates[x + 6][y + 9].image.src = "images/bareTree.png";
    }
    
    dungeonCode[10] = function(x, y)
    {
        for (var i = 0; i <= 7; i++)
        {
            if( i==0 || i==1 )
            {
                coordinates[x + 2][y + i] = new environment();
                coordinates[x + 2][y + i].image.src = "images/stableFence.png";
            }
            else if ( i==4 )
            {
                coordinates[x + 2][y + i] = new environment();
                coordinates[x + 2][y + i].image.src = "images/vaultDoor.png"; 
                coordinates[x + 2][y + i].type = "door";         
            }
            else
            {
                coordinates[x + 2][y + i] = new environment();
                coordinates[x + 2][y + i].image.src = "images/rockWall.png";          
            }
        }
        for(var i = 3; i <= 9; i++)
        {
            coordinates[x + i][y + 2] = new environment();
            coordinates[x + i][y + 2].image.src = "images/rockWall.png";
        }
        for(var i = 3; i <= 9; i++)
        {
            coordinates[x + i][y + 7] = new environment();
            coordinates[x + i][y + 7].image.src = "images/rockWall.png";
        }
        for(var i = 3; i <= 6; i++)
        {
            coordinates[x + 9][y + i] = new environment();
            coordinates[x + 9][y + i].image.src = "images/rockWall.png";
        }
        for(var i = 4; i <= 6; i++)
        {
            if ( i!=5 )
            {
                coordinates[x + 8][y + i] = new environment();
                coordinates[x + 8][y + i].image.src = "images/column.png";
            }
            else
            {
                coordinates[x + 8][y + i] = new environment();
                coordinates[x + 8][y + i].image.src = "images/closedChest.png";
                coordinates[x + 8][y + i].itemName = "treasure chest";
                coordinates[x + 8][y + i].inventory.push(getRandomItem());
            }
        }

        coordinates[x + 4][y + 4] = new environment();
        coordinates[x + 4][y + 4].image.src = "images/stocks.png";

        coordinates[x + 5][y + 4] = new environment();
        coordinates[x + 5][y + 4].image.src = "images/stocks.png";
   
    }
    
    dungeonCode[11] = function(x, y)
    {
        for (var i = 2; i <= 7; i++)
        {
            coordinates[x + i][y] = new environment();
            coordinates[x + i][y].image.src = "images/rockWall.png";
        }
        for (var i = 1; i <= 5; i++)
        {
            if (i!=5)
            {
                coordinates[x + 2][y + i] = new environment();
                coordinates[x + 2][y + i].image.src = "images/rockWall.png";
            }
            else 
            {
                coordinates[x + 2][y + i] = new environment();
                coordinates[x + 2][y + i].image.src = "images/angelStatue.png";
            }
        }
        for (var i = 1; i <= 5; i++)
        {
            if (i!=5)
            {
                coordinates[x + 7][y + i] = new environment();
                coordinates[x + 7][y + i].image.src = "images/rockWall.png";
            }
            else 
            {
                coordinates[x + 7][y + i] = new environment();
                coordinates[x + 7][y + i].image.src = "images/angelStatue.png";
            }
        }
        for (var i = 3; i <= 6; i++)
        {
            if (i!=4)
            {
                coordinates[x + i][y + 4] = new environment();
                coordinates[x + i][y + 4].image.src = "images/stableFence.png";
            }
            else 
            {
                coordinates[x + i][y + 4] = new environment();
                coordinates[x + i][y + 4].image.src = "images/mossyDoor.png";
                coordinates[x + i][y + 4].pass = true;
            }
        }
        for (var i = 0; i <= 9; i++)
        {
            if (i!=3 && i!=4 && i!=5)
            {
                coordinates[x + i][y + 8] = new environment();
                coordinates[x + i][y + 8].image.src = "images/brokenFence.png";
            }
        }

        coordinates[x + 4][y + 2] = new environment();
        coordinates[x + 4][y + 2].image.src = "images/stocks.png";

        coordinates[x + 6][y + 3] = new environment();
        coordinates[x + 6][y + 3].image.src = "images/closedChest.png";
        coordinates[x + 6][y + 3].itemName = "treasure chest";
        coordinates[x + 6][y + 3].inventory.push(getRandomItem());

    }
    
    dungeonCode[12] = function(x, y)
    {
        for (var i = 0; i <= 7; i++)
        {
            coordinates[x][y + i] = new environment();
            coordinates[x][y + i].image.src = "images/brokenFence.png";
        }
        for (var i = 1; i <= 9; i++)
        {
            if( i!=8 )
            {
                coordinates[x + i][y + 7] = new environment();
                coordinates[x + i][y + 7].image.src = "images/brokenFence.png";
            }
        } 
        coordinates[x + 3][y + 1] = new environment();
        coordinates[x + 3][y + 1].image.src = "images/column.png";

        coordinates[x + 6][y + 1] = new environment();
        coordinates[x + 6][y + 1].image.src = "images/column.png";

        coordinates[x + 7][y + 1] = new environment();
        coordinates[x + 7][y + 1].image.src = "images/bareTree.png";

        coordinates[x + 4][y + 3] = new environment();
        coordinates[x + 4][y + 3].image.src = "images/bareTree.png";

        coordinates[x + 3][y + 5] = new environment();
        coordinates[x + 3][y + 5].image.src = "images/brokenColumn.png";

        coordinates[x + 6][y + 5] = new environment();
        coordinates[x + 6][y + 5].image.src = "images/column.png";
    }
    
    dungeonCode[13] = function(x, y)
    {
        for (var i = 2; i <= 7; i++)
        {
            coordinates[x][y + i] = new environment();
            coordinates[x][y + i].image.src = "images/rockWall.png";
        }
        for (var i = 2; i <= 7; i++)
        {
            coordinates[x + 8][y + i] = new environment();
            coordinates[x + 8][y + i].image.src = "images/rockWall.png";
        }
        for (var i = 2; i <= 6; i++)
        {
            if(i === 4)
            {
                coordinates[x + i][y + 4] = new environment();
                coordinates[x + i][y + 4].image.src = "images/altar.png";
            }
            else if( i % 2 === 0 )
            {
                coordinates[x + i][y + 4] = new environment();
                coordinates[x + i][y + 4].image.src = "images/angelStatue.png";
            }
        } 
        coordinates[x + 4][y + 2] = new environment();
        coordinates[x + 4][y + 2].image.src = "images/candelabra.png";

        coordinates[x + 4][y + 6] = new environment();
        coordinates[x + 4][y + 6].image.src = "images/candelabra.png";


    }
    
    dungeonCode[14] = function(x, y)
    {
        for (var i = 7; i <= 9; i++)
        {
            coordinates[x + i][y + 2] = new environment();
            coordinates[x + i][y + 2].image.src = "images/rockWall.png";
        }
        for (var i = 7; i <= 9; i++)
        {
            coordinates[x + i][y + 7] = new environment();
            coordinates[x + i][y + 7].image.src = "images/rockWall.png";
        }
        for (var i = 1; i <= 5; i++)
        {
            if(i === 2)
            {
                coordinates[x + 3][y + i] = new environment();
                coordinates[x + 3][y + i].image.src = "images/vaultDoor.png";
                coordinates[x + 3][y + i].type = "door";

            }
            else
            {
                coordinates[x + 3][y + i] = new environment();
                coordinates[x + 3][y + i].image.src = "images/rockWall.png";
            }
        } 
        for (var i = 1; i <= 5; i++)
        {
            coordinates[x][y + i] = new environment();
            coordinates[x][y + i].image.src = "images/rockWall.png";
        } 
        for (var i = 1; i <= 2; i++)
        {
            coordinates[x + i][y + 1] = new environment();
            coordinates[x + i][y + 1].image.src = "images/rockWall.png";

            coordinates[x + i][y + 5] = new environment();
            coordinates[x + i][y + 5].image.src = "images/rockWall.png";
        }

        coordinates[x + 1][y + 4] = new environment();
        coordinates[x + 1][y + 4].image.src = "images/closedChest.png";
        coordinates[x + 1][y + 4].itemName = "treasure chest";
        coordinates[x + 1][y + 4].inventory.push(getRandomItem());
    }
    
    dungeonCode[15] = function(x, y)
    {
        for (var i = 1; i <= 7; i++)
        {
            if( i==1 || i==7 )
            {
                coordinates[x + 1][y + i] = new environment();
                coordinates[x + 1][y + i].image.src = "images/weaponRack.png";

                coordinates[x + 8][y + i] = new environment();
                coordinates[x + 8][y + i].image.src = "images/weaponRack.png";
            }
            else if ( i==4 )
            {
                coordinates[x + 1][y + i] = new environment();
                coordinates[x + 1][y + i].image.src = "images/knightStatue.png";

                coordinates[x + 8][y + i] = new environment();
                coordinates[x + 8][y + i].image.src = "images/knightStatue.png";            
            }
        }
        for (var i = 1; i <= 7; i++)
        {
            if( i==1 || i==7 )
            {
                coordinates[x + 4][y + i] = new environment();
                coordinates[x + 4][y + i].image.src = "images/column.png";

                coordinates[x + 5][y + i] = new environment();
                coordinates[x + 5][y + i].image.src = "images/column.png";
            }
            else if ( i==4 )
            {
                coordinates[x + 4][y + i] = new environment();
                coordinates[x + 4][y + i].image.src = "images/stocks.png";

                coordinates[x + 5][y + i] = new environment();
                coordinates[x + 5][y + i].image.src = "images/stocks.png";            
            }
        }
    }
    //FINAL LEVEL
    finalLevel = function()
    {
        endgame = true;
        enemyList[enemyIncrementer] = new being("images/dragon.png");
        enemyList[enemyIncrementer].armorClass = 15;
        enemyList[enemyIncrementer].equippedArmorClass = 0;
        enemyList[enemyIncrementer].attackBonus = 10;
        enemyList[enemyIncrementer].equippedAttackBonus = 0;
        enemyList[enemyIncrementer].currentHP = 100;
        enemyList[enemyIncrementer].damage = 10;
        enemyList[enemyIncrementer].desc = "Hell Dragon";
        enemyList[enemyIncrementer].maxHP = 100;
        enemyList[enemyIncrementer].pass = false;
        enemyList[enemyIncrementer].index = 0;
        enemyList[enemyIncrementer].x = 9;
        enemyList[enemyIncrementer].y = 5;

        actorCoordinates[enemyList[enemyIncrementer].x][enemyList[enemyIncrementer].y] = enemyList[enemyIncrementer];
        enemyIncrementer++;
        
        hero.x = 9;
        hero.y = 18;
        
        for (var i = 5; i < 15; i++)
        {
            if (i != 9)
            {
                coordinates[i][2] = new environment();
                coordinates[i][2].image.src = "images/rockWall.png";
            }
            else
            {
                coordinates[i][2] = new environment();
                coordinates[i][2].image.src = "images/vaultDoor.png";
                coordinates[i][2].type = "door";
            }
            
            if (i != 9)
            {
                coordinates[i][17] = new environment();
                coordinates[i][17].image.src = "images/rockWall.png";
            }
            else
            {
                coordinates[i][17] = new environment();
                coordinates[i][17].image.src = "images/vaultDoor.png";
                coordinates[i][17].type = "door";
            }
            
            coordinates[3][i] = new environment();
            coordinates[3][i].image.src = "images/rockWall.png";
            
            coordinates[16][i] = new environment();
            coordinates[16][i].image.src = "images/rockWall.png";
        }
        
        for (var i = 3; i < 6; i++)
        {
            coordinates[5][i] = new environment();
            coordinates[5][i].image.src = "images/rockWall.png";
            
            coordinates[14][i] = new environment();
            coordinates[14][i].image.src = "images/rockWall.png";
            
            coordinates[5][i + 11] = new environment();
            coordinates[5][i + 11].image.src = "images/rockWall.png";
            
            coordinates[14][i + 11] = new environment();
            coordinates[14][i + 11].image.src = "images/rockWall.png";
        }
        
        for (var i = 8; i < 12; i++)
        {
            coordinates[i][0] = new environment();
            coordinates[i][0].image.src = "images/rockWall.png";
            
            coordinates[i][19] = new environment();
            coordinates[i][19].image.src = "images/rockWall.png";
            
            if (i == 8)
            {
                coordinates[i][1] = new environment();
                coordinates[i][1].image.src = "images/rockWall.png";
                coordinates[i][18] = new environment();
                coordinates[i][18].image.src = "images/rockWall.png";
            }
            else if (i == 11)
            {
                coordinates[i][1] = new environment();
                coordinates[i][1].image.src = "images/rockWall.png";
                coordinates[i][18] = new environment();
                coordinates[i][18].image.src = "images/rockWall.png";
            }
            
        }
        
        coordinates[7][7] = new environment();
        coordinates[7][7].image.src = "images/brokenColumn.png";
        coordinates[12][7] = new environment();
        coordinates[12][7].image.src = "images/Column.png";
        coordinates[7][12] = new environment();
        coordinates[7][12].image.src = "images/Column.png";
        coordinates[12][12] = new environment();
        coordinates[12][12].image.src = "images/Column.png";
        
        coordinates[7][8] = new environment();
        coordinates[7][8].image.src = "images/candelabra.png";
        coordinates[12][8] = new environment();
        coordinates[12][8].image.src = "images/candelabra.png";
        coordinates[7][11] = new environment();
        coordinates[7][11].image.src = "images/candelabra.png";
        coordinates[12][11] = new environment();
        coordinates[12][11].image.src = "images/candelabra.png";
        
        coordinates[4][5] = new environment();
        coordinates[4][5].image.src = "images/rockWall.png";
        coordinates[15][5] = new environment();
        coordinates[15][5].image.src = "images/rockWall.png";
        coordinates[15][14] = new environment();
        coordinates[15][14].image.src = "images/rockWall.png";
        coordinates[4][14] = new environment();
        coordinates[4][14].image.src = "images/rockWall.png";
        
        var capeStone = new item();
        
        
        coordinates[10][1] = new environment();
        coordinates[10][1].image.src = "images/closedChest.png";
        coordinates[10][1].itemName = "treasure chest";
        coordinates[10][1].inventory.push();
        
        stairsUp.image.src = "images/stairsUp.png";
        stairsUp.desc = "ascending stairs";
        stairsUp.x = 10;
        stairsUp.y = 18;
        coordinates[stairsUp.x][stairsUp.y] = stairsUp;
        
    }
}

//probability roll 1 - 100
/* take all items with that number or less populate new array with these items
 * random item on that
 * 
 * 
 */

function getRandomItem()
{
    var chestItem = new item();
    var probabilityRoll = rollDice(100);
    var tempItems = new Array();
    
    console.log("Probability: " + probabilityRoll);
    for (var i = 0; i < itemData.length; i++)
    {
        //console.log(itemData[i].probability);
        if (itemData[i].probability >= probabilityRoll)
        {
            tempItems.push(itemData[i]);
        }
    }
    
    chestItem = tempItems[RNG(tempItems.length)];
    return chestItem;
}