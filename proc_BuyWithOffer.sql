USE [ProductCatalogDb]
GO
/****** Object:  StoredProcedure [dbo].[proc_BuyWithOffer]    Script Date: 1.06.2023 23:11:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[proc_BuyWithOffer](@offerId int) 
As
Begin


DECLARE @productId int, @offeredPrice int, @offererId nvarChar(450), @ownerId nvarChar(450)
SELECT @productId = ProductId, @offeredPrice = OfferedPrice, @offererId = UserId FROM Offers WHERE Id=@offerId
SELECT @ownerId = UserId FROM Products WHERE Id=@productId




INSERT INTO CaseHistories (ProductId,BuyerId,SellerId,SoldPrice,CasedDate,IsActive,CreationDate)  VALUES (@productId, @offererId, @ownerId,@offeredPrice, GETDATE(),1,GETDATE())
UPDATE Products SET IsSold = 1 WHERE Id = @productId;
UPDATE Offers SET OfferStatus = 4 WHERE Id = @offerId;


END