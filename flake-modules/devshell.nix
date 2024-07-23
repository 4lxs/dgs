{
  perSystem = {
    self',
    system,
    config,
    pkgs,
    ...
  }: {
    devShells.default = pkgs.mkShell {
      nativeBuildInputs = [
        pkgs.convco
        pkgs.alejandra
        pkgs.pre-commit
        pkgs.typescript

        pkgs.nodejs
        pkgs.nodePackages.typescript
        pkgs.nodePackages.typescript-language-server
      ];
      shellHook = ''
        ${config.pre-commit.installationScript}
      '';
    };
  };
}
