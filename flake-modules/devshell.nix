{
  perSystem = {
    self',
    system,
    config,
    pkgs,
    ...
  }: {
    devShells.default = pkgs.mkShell {
      nativeBuildInputs = [pkgs.convco pkgs.alejandra pkgs.pre-commit];
      shellHook = ''
        ${config.pre-commit.installationScript}
      '';
    };
  };
}
