# Use the official .NET SDK image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY SmartTaskManagementApi.csproj ./
RUN dotnet restore ./SmartTaskManagementApi.csproj

COPY . ./
RUN dotnet publish ./SmartTaskManagementApi.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "SmartTaskManagementApi.dll"]
